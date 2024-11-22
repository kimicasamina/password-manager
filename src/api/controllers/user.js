import { User } from '../../db/models/User'

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()
        return res
            .status(200)
            .json({ users, msg: 'Successfully retrieved data' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Failed to retrieve data' })
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        return res
            .status(200)
            .json({ user, msg: 'Successfully retrieved data' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Failed to retrieve data' })
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const existingUser = await User.findOne({ where: { id } })

        if (!existingUser) {
            return res.status(400).json({ msg: 'User not found' })
        }

        const deletedUser = await existingUser.destroy()
        return res
            .status(200)
            .json({ user: deletedUser, msg: 'Successfully deleted the user' })
    } catch (error) {
        return res.status(400).json({ msg: 'Failed to delete a user' })
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const existingUser = await User.findOne({ where: { id } })

        if (!existingUser) {
            res.json({ msg: 'Cannot find existing user' })
        }

        const updatedUser = await existingUser.update({ ...req.body })
        return res
            .status(200)
            .json({ user: updatedUser, msg: 'Successfully updated the user' })
    } catch (error) {
        res.json({ msg: 'failed to update user' })
    }
}

export const createNewUser = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body })
        return res
            .status(200)
            .json({ user, msg: 'Successfully created a new user' })
    } catch (error) {
        res.json({ msg: 'fail to create a new user' })
    }
}
