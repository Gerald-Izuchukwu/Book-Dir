import express from "express"
const router = express.Router()
import Order from "./OrderContrl.js"
const order = new Order

router.route('/orders').post(order.placeOrder).get(order.hi)

export default router