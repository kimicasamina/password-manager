import express from 'express'
import {
    createNewPassword,
    deletePassword,
    getAllPasswords,
    getPasswordById,
    updatePassword,
} from '../controllers/password'

const router = express.Router()

router.get('/', getAllPasswords)
router.get('/:id', getPasswordById)
router.post('/', createNewPassword)
router.put('/:id', updatePassword)
router.delete('/:id', deletePassword)

export default router
