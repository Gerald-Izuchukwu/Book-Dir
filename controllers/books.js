import Books  from "../models/Books.js";
import Authors from "../models/Authors.js"
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const welcome = (req, res) => {
	res.status(200).json({
		name: 'Book Dir',
		dateStarted: '14/03/2023',
		currentDate: new Date().toISOString(),
	});
};

// this route is to add books to a users shelf and to upload a book
export const addBook = (req, res) => {
	const myBooks = [];
	books.forEach((book) => {
		const bookId = parseInt(req.params.id);
		if (bookId === book.id) {
			myBooks.push(book);
			console.log('book-added');
		}
		res.status(201).json({
			msg: 'Book Added to your Shelf',
			data: book,
		});
	});
};

export const loadBook = asyncHandler(async(req, res, next)=>{
        console.log(req.body);
        const book = await Books.create(req.body)
        res.status(201).json({
            msg: 'Book loaded successfully',
            data: book
        })
})

export const getBooks = asyncHandler(async(req, res, next) => {
	// const removedParams = ['select']
	// const query = {...req.query}
	const removedParams = ['select']
	const {[removedParams]:deletedParam, ...query} = req.query

	if(req.query.select){
		const fields = req.query.select.split(',').join(' ')
		// console.log(deletedParam);
		console.log(query.removedParams);
		// query= query.removedParams(fields)
		// console.log(fields);
	}

	const books = await Books.find(query)
	// console.log(query);
	// console.log(req.query);
	res.status(200).json({
		name: 'Book Shelf',
		message: `This request found ${books.length} results`,
		data: books
	})

});

export const getBooksById = asyncHandler(async (req, res, next) => {
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
			message: `This request found ${book.length} results`,
			data: book,
		});

	
});


export const deleteBooks = asyncHandler(async(req, res) => {
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

export const getAuthors = asyncHandler(async(req, res, next) => {
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

export const getSingleAuthor = asyncHandler(async(req, res, next)=>{
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
