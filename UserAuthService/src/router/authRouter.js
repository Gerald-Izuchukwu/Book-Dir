import express from 'express'
const router = express.Router()
import {registerUsers, loginUser, } from '../controller/authController.js'
import {verifyToken} from '../authMiddleware.js'

router.route('/register').post(registerUsers)
router.route('/login').post(loginUser)

export default router