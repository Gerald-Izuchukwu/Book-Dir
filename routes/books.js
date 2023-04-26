import express from 'express';
import { getBooks, welcome, getAuthors, getBooksById, addBook, loadBook, deleteBooks} from '../controllers/books.js';
const router = express.Router();

router.route('/').get(welcome);

router.route('/books').get(getBooks);

router.route('/load-books').post(loadBook)

router.route('/books/:id').get(getBooksById).post(addBook).delete(deleteBooks);

router.route('/books/authors').get(getAuthors);

router.route('/books/')

export default router;
