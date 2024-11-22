import { Password } from '../../db/models/Password'

export const getAllPasswords = async (req, res, next) => {
    try {
        const passwords = await Password.findAll()
        return res
            .status(200)
            .json({ passwords, msg: 'Successfully retrieved data' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Failed to retrieve data' })
    }
}

export const getPasswordById = async (req, res, next) => {
    try {
        const { id } = req.params
        const password = await Password.findOne({ where: { id } })
        return res
            .status(200)
            .json({ password, msg: 'Successfully retrieved data' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Failed to retrieve data' })
    }
}

export const deletePassword = async (req, res, next) => {
    try {
        const { id } = req.params
        const existingPassword = await Password.findOne({ where: { id } })

        if (!existingPassword) {
            return res.status(400).json({ msg: 'Password not found' })
        }

        const deletedPassword = await existingPassword.destroy()
        return res.status(200).json({
            password: deletedPassword,
            msg: 'Successfully deleted the password',
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Failed to delete a password' })
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        const { id } = req.params
        const existingPassword = await Password.findOne({ where: { id } })

        if (!existingPassword) {
            res.json({ msg: 'Cannot find existing password' })
        }

        const updatedPassword = await existingPassword.update({ ...req.body })
        return res.status(200).json({
            password: updatedPassword,
            msg: 'Successfully updated the password',
        })
    } catch (error) {
        res.json({ msg: 'failed to update password' })
    }
}

export const createNewPassword = async (req, res, next) => {
    try {
        const password = await Password.create({ ...req.body })
        return res
            .status(200)
            .json({ password, msg: 'Successfully created a new user' })
    } catch (error) {
        res.json({ msg: 'fail to create a new user' })
    }
}
