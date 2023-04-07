import express from 'express';
import { getUsers, singleLevel, getLevels } from '../controllers/users.js';
const router = express.Router();

router.route('/users').get(getUsers);
router.route('/levels').get(getLevels);
router.route('/levels/:id').get(singleLevel);

export default router;
