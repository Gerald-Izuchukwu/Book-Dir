// import fs from 'fs';
// import { request } from 'http';
// import path from 'path';
import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config({path: './config/.env'})
import { loggerMiddleware } from './middlewares/logger.js';
import booksRoute from './routes/books.js';
import usersRoute from './routes/users.js';
import connectDB from './data/db.js';
const app = express();
const PORT = process.env.PORT  || 9600;

connectDB()

app.use(loggerMiddleware);

app.use('/', booksRoute);
app.use('/', usersRoute);

app.post('/', (req, res) => {});

const server = app.listen(PORT, () => {
	console.log(`server is running on: ${PORT}`);
	console.log(process.env.PORT);
});

process.on('unhandledRejection', (reason, promise)=>{
	console.error(`unhandled Promise Rejection: ${reason}`);
	console.error(promise);

	server.close(()=>{
		process.exit(1)
	})
	
})