import Password from '../../db/models/Password'
import User from '../../db/models/User'
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/generateToken'
import { checkPassword } from '../../utils/checkPassword'

export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body
    let existingUser

    // check if user already exists
    try {
        existingUser = await User.findOne({ where: { email } })
    } catch (error) {
        return res.status(401).json({ error: 'Registration failed' })
    }

    if (existingUser) {
        return res.status(401).json({
            error: 'User already exist! Login Instead',
        })
    }

    // create new user
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        username,
        email,
        password: hashPassword,
    })

    const doc = { username: username, email: email }
    return res.status(201).json({ msg: 'User registered successfully' })
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        // check if user exists in the database
        const existingUser = await User.findOne({
            where: { email },
            include: {
                model: Password,
                as: 'passwords',
                // attributes: ['name', 'email'],
            },
        })

        if (!existingUser) {
            res.status(404).json({ error: 'Cannot find existing user' })
        }

        // check if password is correct
        const isPasswordMatch = checkPassword(password, existingUser.password)

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Incorrect password' })
        }

        // if the user is valid, generate a token
        const token = generateToken(existingUser.id)

        // send the generated token cookie to the browser
        res.cookie('access_token', token, {
            httpOnly: true,
            expiresIn: '30m',
        })
        res.status(201).json({
            msg: 'User successfully logged in.',
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
                passwords: existingUser.passwords,
            },
        })
    } catch (error) {
        res.status(401).json({ error: 'fail to login' })
    }
}

export const logoutUser = async (req, res, next) => {
    let token = req.cookies.access_token
    console.log('DELETE TOKEN', token)
    try {
        res.clearCookie('access_token')
        res.json({ msg: 'You are logged out.' })
    } catch (err) {
        console.log(err)
    }
}

export const getUserDetails = async (req, res, next) => {
    let user_token = req.user
    console.log('REQ USER_ID', user_token)

    try {
        const user = await User.scope('withoutPassword').findOne({
            where: { id: user_token.id },
            include: {
                model: Password,
                as: 'passwords',
                // attributes: ['name', 'email'],
            },
            // exclude: 'password',
        })
        return res.status(200).json({ user })
    } catch (err) {
        console.log(err)

        return res.status(401).json({ msg: 'User not found' })
    }
}
