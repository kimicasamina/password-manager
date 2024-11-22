import express from 'express'

const router = express.Router()

import {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/user'

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createNewUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
