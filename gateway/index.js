import express from "express";
import cors from 'cors'
import proxy from "express-http-proxy";

const app = express()
app.use(cors())
app.use(express.json())

app.use('/rent', proxy('http://localhost:'))
app.use('/auth', proxy('http://localhost:9802/api/bookdir/user'))
app.use('/user', proxy('http://localhost:9802/api/bookdir/auth'))
app.use('/order', proxy('http://localhost:9801/api/bookdir/order'))
app.use('/books', proxy('http://localhost:9800/api/bookdir'))
app.use('/', proxy('http://localhost:9800/api/bookdir'))
