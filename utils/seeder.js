import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config({path: '../config/.env'})
import Books from "../models/Books.js";
import books from "../data/books.js";
import colors from 'colors'
const seeder = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log('Database connecrted on:', mongoose.connection.host);
    Books.insertMany(books).then((docs)=>{
        console.log('Book seeded succesfully'.blue);
    }).catch((error)=>{
        console.log(error);
    })

}

seeder()