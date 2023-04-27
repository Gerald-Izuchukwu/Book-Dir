import users from '../data/users.js';
import levels from '../data/levels.js';

export const createUser = async(res, req) => {
	try {
		console.log(req.body);
		const user = await users.create(req.body)
		res.status(201).json({
			msg: 'Success: User created',
			data: user
		})
	} catch (error) {
		if (error) {
			console.log(error);
		}
	}
};

export const getUsers = async (req, res) => {
	try {
		const usersArray = [];

		users.forEach((user) => {
			const { name, username } = user;
			usersArray.push({ name, username });
		});
		res.status(200).json({
			msg: 'Successful',
			data: usersArray,
		});
	} catch (err) {
		if (err) {
			console.log(err);
		}
	}
};

export const getLevels = async (req, res) => {
	try {
		const levelsArray = [];
		levels.forEach((level) => {
			const { name, logo } = level;
			levelsArray.push(name, logo);
		});
		res.status(200).json({
			data: levelsArray,
		});
	} catch (err) {
		if (err) {
			console.log(err);
		}
	}
};

export const singleLevel = async (req, res) => {
	try {
		const levelId = parseInt(req.params.id);
		const usersArray = [];
		const levelsArray = [];
		levels.forEach((level) => {
			const { name, logo, description } = level;
			if (levelId === level.id) {
				levelsArray.push({ name, logo, description });
			}
		});
		users.forEach((user) => {
			const { name, username, level } = user;
			if (levelId === user.level.id) {
				usersArray.push(name, username);
			}
		});
		res.status(200).json({
			msg: 'success',
			data: {
				level: levelsArray,
				more: usersArray,
			},
		});
	} catch (err) {
		if (err) {
			console.log(err);
		}
	}
};
