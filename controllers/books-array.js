import books from '../data/books.js';

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

export const getBooks = (req, res) => {
	res.status(200).json({
		name: 'Book Shelf',
		data: books,
	});
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
