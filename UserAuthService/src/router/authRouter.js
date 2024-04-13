import express from 'express'
const router = express.Router()
import {registerUsers, loginUser, bittch } from '../controller/authController.js'

router.route('/register').post(registerUsers)
router.route('/login').post(loginUser)
router.route('/bet').get(bittch)

export default router