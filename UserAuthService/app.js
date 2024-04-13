import * as dotenv from 'dotenv'
dotenv.config({path: './.env'})
import express from 'express'
const app = express()
import colors from 'colors'
import userRouter from './src/router/userRouter.js'
import authRouter from './src/router/authRouter.js'
import connectDB from './src/dbConnect.js'
const PORT = process.env.PORT || 9802
connectDB()

app.use(express.json())


app.use('/api/bookdir/auth/', authRouter)
app.use('/api/bookdir/user/', userRouter)


app.listen(PORT, ()=>{
    console.log(`Server is running on here ${PORT}`.yellow)
    console.log(process.env.PORT.rainbow)
})