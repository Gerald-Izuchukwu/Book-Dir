import Users from '../models/Users.js'
import Level from '../models/Levels.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import PasswordValidator from 'password-validator';
import EmailValidator from "email-validator";

// please clean up this controller maybe with model.validate
export const createUser = asyncHandler( async(req, res, next) => {
	console.log(req.body);
	const {name, password, username, email, role} = req.body
	const validEmail = EmailValidator.validate(email)
	const validPassword = new PasswordValidator()
	validPassword
		.is().min(6)
		.has().uppercase()
		.has().lowercase()
		.has().digits()
		.has().symbols()

	const isValidPassword = validPassword.validate(password)

	if(!validEmail){
		return res.status(400).json({
			success: false,
			message: 'Wrong email format'
		})
	}

	if(!isValidPassword){
		return res.status(400).json({
			success: false,
			message: "Please enter a minimum of 6 character password that has a number, a special character and uppercase and lowercase letters"
		})
	}
	if (validEmail && isValidPassword){
		const user = await Users.create({name, password, username, email, role})
		const token = user.getSignedJWTtoken()
		res.status(201).json({
			msg: 'Success: User created',
			data: user,
			token
		})
	}
	
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
		if(!level){
			return res.status(404).json({
				success: false,
				message: 'Resource not found'
			})
		}
		res.status(200).json({
			msg: 'success',
			data: {
				level
			},
		});

});

export const uploadLevelPhoto = asyncHandler(async(req, res, next)=>{
	const level = await Level.findById(req.params.id)
	if(!level){
		return res.status(404).json({
			success: false,
			message: 'Resource not found'
		})
	}

	if(!req.files){
		return res.status(404).json({
			success: false,
			message: 'please upload a correct image file type'
		})
	}
})
