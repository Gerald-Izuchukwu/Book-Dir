import Books from "../models/Books.js"
import Authors from "../models/Authors.js"
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import rabbitConnect from "../rabbitConnect.js"
import axios from "axios"

// books can be rented or bought by signed in users 
// free books can be read(accessed by anyone, signed or unsigned users)

export class Book {
	myBooks = []
	// constructor(myBooks){
	// 	this.myBooks = myBooks
	// }
	welcome=(req, res)=>  {
		res.status(200).json({
			name: 'Book Dir',
			dateStarted: '14/03/2023',
			currentDate: new Date().toISOString(),
		});
	}
	buyBook = asyncHandler(async(req, res, next)=>{
		const {ids} = req.body
        const createdOrderArray = []
		const books = await Books.find({_id: {$in: ids}})
		await rabbitConnect().then((channel)=>{
			channel.sendToQueue("ORDER", Buffer.from(JSON.stringify({books})))
			console.log('sending book to ORDER queue')
			console.log(books)
			return
		}).then(()=>{
			axios.post("http://localhost:9801/api/v1/bookdir/orders").catch((err)=>{console.log(err.message);})
		})

		rabbitConnect().then((channel)=>{
			channel.consume("BOOK", (data)=>{
				console.log('consuming PRODUCT queue');
				const createdOrder =  JSON.parse(data.content)
                createdOrderArray.push(createdOrder)
                console.log(JSON.parse(data.content));
                channel.ack(data)

			})
			setTimeout(()=>{
                channel.close()
                return res.status(200).json(createdOrderArray[0])

            }, 2000)
		})

	})
	rentBook = asyncHandler(async(req, res, next)=>{
		const {ids, duration} = req.body
		// const user = req.email
		const user = 'me'
		const createdOrderArray = []
		const cantBeRentedArray =[]
		const books = await Books.find({_id: {$in: ids}})
		books.filter((book)=>{
			if(book.canRent === false){
				cantBeRentedArray.push(book.id)
			}
		})
		if(cantBeRentedArray.length>0){
			console.log(cantBeRentedArray)
			return res.status(400).json({
				message: "These books cannot be rented",
				books: cantBeRentedArray
			})
		}
		await rabbitConnect().then((channel)=>{
			channel.sendToQueue("RENT", Buffer.from(JSON.stringify({books, duration, user})))
			console.log('sending book to RENT queue')
			console.log(books)
			return
		}).then(()=>{
			axios.post("http://localhost:9803/api/v1/bookdir/rent-book").catch((err)=>{console.log(err.message);})
		})

		rabbitConnect().then((channel)=>{
			channel.consume("BOOK", (data)=>{
				console.log('consuming PRODUCT queue');
				const createdOrder =  JSON.parse(data.content)
                createdOrderArray.push(createdOrder)
                console.log(JSON.parse(data.content));
                channel.ack(data)

			})
			setTimeout(()=>{
                channel.close()
                return res.status(200).json(createdOrderArray[0])

            }, 2000)
		})
	})
	addBook = asyncHandler(async (req, res)=> { //maybe to add book to your shelf
		const book = await Books.findById(req.params.id)
		if(!book){
			console.log('Book does not exist')
			return res.status(400).send("Book not found")
		}
		this.myBooks.push(book)
		return res.status(201).send('Book added to shelf')
	})
	loadBook = asyncHandler(async(req, res, next)=>{ //this route never complete
		if(req.user.role !== "publisher"){
			console.log("User cant upload books");
		}
		res.sendFile(__dirname + '/index.html') 
        console.log(req.body);
        const book = await Books.create(req.body)
        res.status(201).json({
            msg: 'Book loaded successfully',
            data: book
        })
	})
	getBooks = asyncHandler(async(req, res, next) => {

		// const removedParams = ['select']
		// const {[removedParams]:deletedParam, ...query} = req.query
	
		// if(req.query.select){
		// 	const fields = req.query.select.split(',').join(' ')
		// 	console.log(query.removedParams);
		// }
	
		// const books = await Books.find(query)
		const books = await Books.find()
		res.status(200).json({
			name: 'Book Shelf',
			message: `This request found ${books.length} results`,
			data: books
		})
	
	});
	getBooksById = asyncHandler(async (req, res, next) => {
		const bookId = req.params.id
		const book = await Books.findById(bookId)
		if (!book) {
			return res.status(404).json({
				success: false,
				error: "Resource not found"
			})

		}
		res.status(200).json({
			msg: 'Success',
			data: book,
		});
	});

	deleteBooks = asyncHandler(async(req, res) => {
		const book = await Books.deleteMany()
		res.status(200).json({
			success: 'true',
			msg: 'Book Removed from shelf',
			data: book
		})
	});
	deleteABook = asyncHandler(async(req, res) => {
		const book = await Books.findByIdAndDelete(req.params.id)
		if (!book) {
			return res.status(404).json({
				success: false,
				message: "Resource not found"
			})
		}
		res.status(200).json({
			success: 'true',
			msg: 'Book Removed from shelf',
			data: book
		})
	});
	getSingleAuthor = asyncHandler(async(req, res, next)=>{
		const author = await Authors.findById(req.params.id).populate({
			path: 'books',
			select: 'name category about'
		})
		if(!author){
			return res.status(404).json({
				success: false,
				message: 'Resource not found'
			})
		}
		res.status(200).json({
			success : true,
			data: author
		})
	})

	getAuthors = asyncHandler(async(req, res, next) => {
		const authors = await Authors.find(req.query).populate({
			path: 'books',
			select: 'name category about'
		})
		if(!authors){
			return res.status(404).json({
				success : false,
				message: "Resource not found"
			})
		}
		res.status(200).json({
			success: true,
			count: `This request returned ${authors.length} result`,
			data: authors
		})
	});
	
}