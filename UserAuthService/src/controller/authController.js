import {registerService, loginService, } from "../authService.js"
import EmailValidator from 'email-validator'
import PasswordValidator from 'password-validator'

const validatePassword=(password)=>{
    return new Promise((resolve, reject)=>{
        const validPassword = new PasswordValidator()
        validPassword
            .is().min(8)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().symbols()
        
        const isValidPassword = validPassword.validate(password)
        if(isValidPassword===true){
            resolve(isValidPassword)
        }else if(isValidPassword===false){
            reject(isValidPassword)
        }
    })
}

const validateEmail=(email)=>{
    return new Promise((resolve, reject)=>{
        const isValidEmail = EmailValidator.validate(email)
        if(isValidEmail===true){
            resolve(isValidEmail)
        }else if(isValidEmail===false){
            reject(isValidEmail)
        }

    })
}

export const registerUsers = async(req, res)=>{
    try {
        const {name,  email, password} = req.body
        if(!name ||  !email || !password){
            console.log('Fill In All Fields')
            return res.status(200).send('Please fill in all fields')
        }
        const validEmail = await validateEmail(email)
        const validPassword = await validatePassword(password)

        if(!validEmail){
            return res.status(400).json({
                success: false,
                message: 'Wrong email format'
            })
        }

        if(!validPassword){
            return res.status(400).json({
                success: false,
                message: "Please enter a minimum of 6 character password that has a number, a special character and uppercase and lowercase letters"
            })
        }

        const userData = {
            name,
            email,
            password
        }

        registerService(userData, (err, result)=>{
            if(err){
                console.log(err.message);
                return res.status(400).send(err.message)

            }else{
                return res.status(201).json({
                    message: 'User Successfully Registered',
                    Details: result
                })
            }
        })
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error, Please try again after some time",
            error
        })
    }
}

export const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body
        console.log(email, password);
        const userData = {email, password}
        loginService(userData, (err, result)=>{
            if(err){
                console.log(err);
                return res.status(400).send(err)
            }else{
                return res.status(200).send(result) //result is the token, check authService
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error, Please try again after some time",
            error
        })
    }

}

export const bittch = (req, res)=>{
    return res.status(200).send(process.env.AUTH_SECRET)
}