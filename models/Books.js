import mongoose from "mongoose";

const Books = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: false,
        trim: true,
        maximumLength: [100, 'Name of Book should not be longer than 100 characters']
    },
    author : {
        type: String,
        required: true,
        unique: false,
        trim: true,
        maximumLength: [30, 'Authors name should not be more than 30 characters']
    },
    category: {
        type: String,
        enum: ['Non-Fiction', 'Fiction'],
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["Biography", "Contemporary", "Tragedy", "Rural", "Comedy", "Romance"]
    }

})