import Users from '../models/Users.js'
import Level from '../models/Levels.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

export const createUser = asyncHandler( async(req, res, next) => {
		console.log(req.body);
		const user = await Users.create(req.body)
		res.status(201).json({
			msg: 'Success: User created',
			data: user
		})
});

export const getUsers = asyncHandler (async (req, res, next) => {
		const users = await Users.find(req.query)
		if(!users){
			return res.status(404).json({
				success: false,
				message: 'resource not found'
			})
		}
		res.status(200).json({
			msg: 'Successful',
			data: users,
		});
});

export const singleUser = asyncHandler (async(req, res, next)=>{
		const user = await Users.findById(req.params.id)
		/**if route is protected, ie the request is coming from the user, return users profile else return certain feilds of the user profile */
		if(!user){
			return next(new ErrorResponse(500, `We could not find the resource`))
		}
		res.status(200).json({
			data : user
		})
}) 

export const getLevels = asyncHandler(async (req, res, next) => {
		const levels = await Level.find(req.query)
		res.status(200).json({
			data: levels,
		});

});

export const singleLevel = asyncHandler (async (req, res, next) => {
		const level = await Level.findById(req.params.id).select('levelName levelLogo levelDescription').exec()
		res.status(200).json({
			msg: 'success',
			data: {
				level
			},
		});

});
