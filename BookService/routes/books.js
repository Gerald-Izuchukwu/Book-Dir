import express from 'express';
import {Book} from '../controllers/books/books.js';
const router = express.Router();
const book = new Book()
const {welcome, getAuthors, getBooks, getBooksById, loadBook, addBook, deleteABook, deleteBooks, getSingleAuthor, buyBook } = book
router.route('/').get(welcome);

router.route('/books').get(getBooks).delete(deleteBooks);
router.route("/buybooks").post(buyBook)
router.route('/load-books').post(loadBook)

router.route('/books/:id').get(getBooksById).post(addBook).delete(deleteABook);
router.route('/authors').get(getAuthors); //if i do /books/authors...it results in an error
router.route('/authors/:id').get(getSingleAuthor)


export default router;
