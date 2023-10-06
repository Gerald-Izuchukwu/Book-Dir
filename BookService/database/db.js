import mongoose from "mongoose";

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    // console.log(process.env.MONGO_URI );
    console.log(`database is connected to ${mongoose.connection.name} on ${process.env.MONGO_URI}`.yellow.italic.underline);
}
export default connectDB