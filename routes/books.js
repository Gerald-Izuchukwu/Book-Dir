import express from 'express';
import { getBooks, welcome, getAuthors, getBooksById, addBook, loadBook} from '../controllers/books.js';
const router = express.Router();

router.route('/').get(welcome);

router.route('/books').get(getBooks);

router.route('/load-books').post(loadBook)

router.route('/books/:id').get(getBooksById).post(addBook);

router.route('/authors').get(getAuthors);

export default router;
