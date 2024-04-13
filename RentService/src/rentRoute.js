import express from "express"
const router = express.Router()
import { RentOrder } from "./rentController.js"
const rentBook = new RentOrder()
router.route('/rent-book').post(rentBook.rent)

export default router