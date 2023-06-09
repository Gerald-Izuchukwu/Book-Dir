import express from 'express';
import { createUser, getUsers, singleUser, singleLevel, getLevels, uploadLevelPhoto } from '../controllers/users.js';
const router = express.Router();

router.route('/users/create').post(createUser)
router.route('/users').get(getUsers);
router.route('/users/:id').get(singleUser);
router.route('/levels').get(getLevels);
router.route('/levels/:id').get(singleLevel);
router.route('/levels/fileupload/:id').put(uploadLevelPhoto);


export default router;
