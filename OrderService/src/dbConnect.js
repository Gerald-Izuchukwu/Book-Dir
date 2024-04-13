import mongoose from "mongoose"
const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected to ${mongoose.connection.name} on ${process.env.MONGO_URI}`.yellow.italic.underline);
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`.red.bold);
    }
}
export default connectDB