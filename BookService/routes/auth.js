import express from 'express'
const router = express.Router()
import {registerUsers} from "../controllers/auth.js"

router.route('/register').post(registerUsers)
// router.route('/login').post()

export default router