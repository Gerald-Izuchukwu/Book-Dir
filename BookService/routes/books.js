import express from 'express';
import {Book} from '../controllers/books.js';
const router = express.Router();
const book = new Book()
const {welcome, getAuthors, getBooks, getBooksById, loadBook, addBook, deleteABook, deleteBooks, getSingleAuthor, buyBook, rentBook } = book
router.route('/').get(welcome);

router.route('/books').get(getBooks).delete(deleteBooks);
router.route("/buy-book").post(buyBook)
router.route('/rent-book').post(rentBook)
router.route('/load-books').post(loadBook)

router.route('/books/:id').get(getBooksById).post(addBook).delete(deleteABook);
router.route('/authors').get(getAuthors); //if i do /books/authors...it results in an error
router.route('/authors/:id').get(getSingleAuthor)


export default router;
