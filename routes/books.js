import express from 'express';
import { getBooks, welcome, getAuthors, getSingleAuthor, getBooksById, addBook, loadBook, deleteBooks} from '../controllers/books.js';
const router = express.Router();

router.route('/').get(welcome);

router.route('/books').get(getBooks);

router.route('/load-books').post(loadBook)

router.route('/books/:id').get(getBooksById).post(addBook).delete(deleteBooks);
router.route('/authors').get(getAuthors); //if i do /books/authors...it results in an error
router.route('/authors/:id').get(getSingleAuthor)


export default router;
