import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Users')
        console.log(`database connected on 'mongodb://localhost:27017/Users'`.green )  
    } catch (error) {
        console.log(error)
    }

    
}

export default connectDB