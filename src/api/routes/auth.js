import express from 'express'

const router = express.Router()

import {
    registerUser,
    loginUser,
    getUserDetails,
    logoutUser,
} from '../controllers/auth'
import verifyToken from '../../middleware/verifyToken'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', verifyToken, getUserDetails)
router.delete('/logout', logoutUser)

export default router
