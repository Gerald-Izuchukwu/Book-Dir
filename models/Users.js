import mongoose from "mongoose";
import Level from "./Levels.js"; //importing Levels Model

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input a name'],

    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    level : {
        type: String,
        enum : ['Beginner Reader', 'Intermediate Reader', 'Friendly Reader', 'Top Reader', 'Ultimate Reader',],
        default: 'Beginner Reader'
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

    
})

const Users = mongoose.model('Users', userSchema)
export default Users