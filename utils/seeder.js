import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config({path: '../config/.env'})
import Authors from "../models/Authors.js";
import authors from "../data/authors.js";
import Books from "../models/Books.js";
import books from "../data/books.js";
import Users from "../models/Users.js";
import users from "../data/users.js"
import Level from "../models/Levels.js";
import levels from "../data/levels.js"
import colors from 'colors'
const seederAdd = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected '.bgGreen);
    await Books.insertMany(books).then((docs)=>{
        console.log('Books seeded succesfully'.blue);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })  
    await Authors.insertMany(authors).then((docs)=>{
        console.log('Authors Seeded Successfully'.yellow);
    }).catch((error)=>{
        console.log(error);
    })   
    await Level.insertMany(levels).then((docs)=>{
        console.log('Levels seeded succesfully'.green);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })
    await Users.insertMany(users).then((docs)=>{
        console.log('Users seeded succesfully'.blue);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })
    process.exit()

}

const seederDel = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected ');
    await Books.deleteMany().then((docs)=>{
        console.log('Books Deleted Successfully'.red);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })

    await Authors.deleteMany().then((docs)=>{
        console.log('Authors Deleted Successfully'.red);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })    
    await Users.deleteMany().then((docs)=>{
        console.log('Users Deleted Successfully'.red);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })
    await Level.deleteMany().then((docs)=>{
        console.log('Levels Deleted Successfully'.red);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })
    process.exit()

}

if(process.argv[2]==='-i'){
    seederAdd()
}else if(process.argv[2]==='-d'){
    seederDel()
}else{
    console.log('there was an error');
}