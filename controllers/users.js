import Users from '../models/Users.js'
import Level from '../models/Levels.js'

export const createUser = async(req, res) => {
	try {
		console.log(req.body);
		const user = await Users.create(req.body)
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
		const users = await Users.find()
		res.status(200).json({
			msg: 'Successful',
			data: users,
		});
	} catch (err) {
		console.log(err);
	}
};

export const singleUser = async(req, res)=>{
	try {
		const user = await Users.findById(req.params.id)
		/**if route is protected, ie the request is coming from the user, return users profile else return certain feilds of the user profile */
		res.status(200).json({
			data : user
		})
	} catch (error) {
		console.log(error);
	}
} 

export const getLevels = async (req, res, next) => {
	try {
		const levels = await Level.find()
		res.status(200).json({
			data: levels,
		});
	} catch (err) {
		next(err)
	}
};

export const singleLevel = async (req, res, next) => {
	try {
		const level = await Level.findById(req.params.id).select('levelName levelLogo levelDescription').exec()
		res.status(200).json({
			msg: 'success',
			data: {
				level
			},
		});
	} catch (err) {
		next(err)
	}
};
