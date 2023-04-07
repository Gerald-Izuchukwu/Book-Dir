import mongoose from "mongoose";

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    // console.log(process.env.MONGO_URI );
    console.log(`database is connected on ${mongoose.connection.host}`);
}
export default connectDB