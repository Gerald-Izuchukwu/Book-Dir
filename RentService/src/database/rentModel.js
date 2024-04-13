import mongoose from 'mongoose'

const RentSchema = new mongoose.Schema({
    book: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    rentedTo: {
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

const RentModel = mongoose.model("Rents", RentSchema)
export default RentModel