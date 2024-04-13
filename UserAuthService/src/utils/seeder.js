import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config({path: "../congig/.env"})
// import Users from "../models/Users.js";
// import users from "./users.js"
import Level from "../models/Level.js"
import levels from "./levels.js";
import colors from 'colors'
const seederAdd = async()=>{
    console.log("mongodb://localhost:27017/Users");
    mongoose.connect("mongodb://localhost:27017/Users")
    console.log('Database connected '.bgGreen);
    await Level.insertMany(levels).then((docs)=>{
        console.log('Levels seeded succesfully'.green);
        // process.exit()
    }).catch((error)=>{
        console.log(error);
    })
    // await Users.insertMany(users).then((docs)=>{
    //     console.log('Users seeded succesfully'.blue);
    //     // process.exit()
    // }).catch((error)=>{
    //     console.log(error);
    // })
    process.exit()

}

const seederDel = async()=>{
    mongoose.connect("mongodb://localhost:27017/Users")
    console.log('Database connected ');

    // await Users.deleteMany().then((docs)=>{
    //     console.log('Users Deleted Successfully'.red);
    //     // process.exit()
    // }).catch((error)=>{
    //     console.log(error);
    // })
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