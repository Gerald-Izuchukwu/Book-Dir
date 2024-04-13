import mongoose from "mongoose";
const RentSchema = new mongoose.Schema({
    books: {
        type: Array
    },
    totalPrice: Number,
    user: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
        enum: ['1 Month', '2 Months', '3 Months', '6 Months', '1 Year']
    }

}, {
    timestamps: true
})

const Rents = mongoose.model('Rents', RentSchema)
export default Rents