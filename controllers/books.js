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

export const getBooksById = async (req, res) => {
	try {
		const bookId = req.params.id
		const book = await Books.findById(bookId)
		if (!book) {
			return res.status(404).json({
				msg: `Sorry We could not find that book with id: ${bookId}`,
			});
		}
		res.status(200).json({
			msg: 'Success',
			data: book,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.name
		})
		console.log(error)	
	}
	
};

export const getAuthors = async(req, res) => {
	try {
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
		
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: error.name
		})
		console.log(error)	
	}

};

export const deleteBooks = async(req, res) => {
	try {
		const book = await Books.findByIdAndDelete(req.params.id)
		if(!book){
			return res.status(404).json({
				success: 'false',
				msg: 'Sorry such Book doesnt exist in your shelf'
			})
		}
		res.status(200).json({
			success: 'true',
			msg: 'Book Removed from shelf',
			data: book
		})
	} catch (error) {

		res.status(400).json({
			success: false,
			msg: error.name
		})
		console.log(error)
	}

};
