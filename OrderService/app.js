import * as dotenv from 'dotenv'
dotenv.config({path: './config/config.env'})
import express, {urlencoded} from 'express'
import connectDB from './database/db.js'
import colors from "colors"
import router from './routes/orders.js'
const app = express()
const PORT = process.env.PORT || 9801;

connectDB()

app.use(express.json())
app.use(urlencoded({extended:false}))

app.use('/api/v1/bookdir/',router )

const server = app.listen(PORT, ()=>{
    console.log(`server is running on: ${PORT}`.blue.bold);
	console.log(process.env.PORT.rainbow);
})
