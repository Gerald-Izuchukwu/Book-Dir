import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    books: {
        type: Array
    },
    totalPrice: Number,
    user: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Orders = mongoose.model('Orders', OrderSchema)
export default Orders