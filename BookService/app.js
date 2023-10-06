import express, { urlencoded } from 'express';
import * as dotenv from 'dotenv'
dotenv.config({path: './config/.env'})
import { loggerMiddleware } from './middlewares/logger.js';
// import errorHandler from './middlewares/error.js';
import booksRoute from './routes/books.js';
// import usersRoute from './routes/users.js';
import connectDB from './database/db.js';
// import authRoute from './routes/auth.js'
import colors from 'colors'
import fileUpload from 'express-fileupload';
// import verifyToken from './controllers/authMiddleware.js';
// import { color } from './config/colors.js';
const app = express();
const PORT = process.env.PORT  || 9800;


connectDB()
app.set('view-engine', 'ejs')
app.use(express.json())
app.use(urlencoded({extended:false}))

app.use(loggerMiddleware);
// app.use(fileUpload)
// app.use('/auth', authRoute)
app.use('/api/v1/bookdir/',  booksRoute);
// app.use('/', verifyToken, usersRoute);
// app.use(errorHandler)

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