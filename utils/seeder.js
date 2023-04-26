import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config({path: '../config/.env'})
import Books from "../models/Books.js";
import books from "../data/books.js";
import colors from 'colors'
const seederAdd = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected ');
    Books.insertMany(books).then((docs)=>{
        console.log('Book seeded succesfully'.blue);
        process.exit()
    }).catch((error)=>{
        console.log(error);
    })

}

const seederDel = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected ');
    Books.deleteMany().then((docs)=>{
        console.log('Books Deleted Successfully'.red);
        process.exit()
    }).catch((error)=>{
        console.log(error);
    })

}

if(process.argv[2]==='-i'){
    seederAdd()
}else if(process.argv[2]==='-d'){
    seederDel()
}else{
    console.log('there was an error');
}