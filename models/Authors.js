import mongoose from "mongoose";

export const Authors = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        trim : true,
        maximumLength: [30, 'Authors name should not be more than 30 characters']    
    },
    about: {
        type: String,
        required: false,
        maximumLength: [500, 'tell us about the author']

    },
    works: {
        type: String,
        required: false,
    }
})