import Books  from "../models/Books.js";
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
        const books = await Books.find()
        res.status(200).json({
			name: 'Book Shelf',
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
			data: book,
		});

	
});

export const getAuthors = asyncHandler(async(req, res) => {
		const bookAuthors = [];
		const anotherauthor = []
		const authors = await Books.findOne()
		console.log(authors);
		console.log('------');
		console.log(bookAuthors);
		bookAuthors.push(authors)
		bookAuthors.forEach((author)=>{
			anotherauthor.push(author)
			console.log('push happening');
			console.log(authors);
			console.log('------');
			console.log(bookAuthors);
			console.log('--------------------------');
			console.log(anotherauthor);
		})

		res.status(200).json({
			name: 'Authors',
			// data: bookAuthors
		});
		// console.log(bookAuthors);
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
