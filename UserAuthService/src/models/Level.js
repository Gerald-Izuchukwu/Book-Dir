import mongoose from "mongoose";
// const schema = mongoose.Schema

const LevelSchema = new mongoose.Schema({
    levelId : Number,
    levelName: String,
    levelLogo: String,
    levelDescription: String
})

const Level = mongoose.model('Level', LevelSchema)
export default Level
