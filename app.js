// import fs from 'fs';
// import { request } from 'http';
// import path from 'path';
import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config({path: './config/.env'})
import { loggerMiddleware } from './middlewares/logger.js';
import errorHandler from './middlewares/error.js';
import booksRoute from './routes/books.js';
import usersRoute from './routes/users.js';
import connectDB from './data/db.js';
import colors from 'colors'
import fileUpload from 'express-fileupload';
// import { color } from './config/colors.js';
const app = express();
const PORT = process.env.PORT  || 9600;

connectDB()

app.use(express.json())

app.use(loggerMiddleware);
app.use(fileUpload)
app.use('/', booksRoute);
app.use('/', usersRoute);
app.use(errorHandler)


app.post('/', (req, res) => {});

const server = app.listen(PORT, () => {
	console.log(`server is running on: ${PORT}`.blue.bold);
	console.log(process.env.PORT.rainbow);
});

process.on('unhandledRejection', (reason, promise)=>{
	console.error(`unhandled Promise Rejection: ${reason}`);
	console.error(promise);

	server.close(()=>{
		process.exit(1)
	})
	
})