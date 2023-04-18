import Books  from "../models/Books.js";

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

export const loadBook = async(req, res)=>{
    try {
        console.log(req.body);
        const book = await Books.create(req.body)
        res.status(201).json({
            msg: 'Book loaded successfully',
            data: book
        })
    } catch (error) {
        res.status(400).json({
            msg: 'there was an error'
        })
        console.log(error);
    }
}

export const getBooks = async(req, res) => {
    try {
        const books = await Books.find()
        res.status(200).json({
		name: 'Book Shelf',
		data: books
	});
    } catch (error) {
        res.status(400).json({
            success: false
        })
        console.log(error);
    }

};

export const getBooksById = (req, res) => {
	const singleBook = [];
	const bookId = parseInt(req.params.id);
	books.forEach((book) => {
		if (bookId === book.id) {
			singleBook.push(book);
		}
	});
	if (singleBook.length === 0) {
		return res.status(404).json({
			msg: `Sorry We could not find that book with id: ${bookId}`,
		});
	}
	res.status(200).json({
		msg: 'Success',
		data: singleBook,
	});
};

export const getAuthors = (req, res) => {
	const bookAuthors = [];
	books.forEach((book) => {
		bookAuthors.push(book.Author);
	});
	res.status(200).json({
		name: 'Authors',
		data: bookAuthors,
	});
	console.log(bookAuthors);
};

export const updateBooks = (req, res) => {};
