import jwt from "jsonwebtoken"
const secret = process.env.AUTH_SECRET
import {findUser, addUser} from './authDAO.js'
import bcrypt from 'bcryptjs'


export const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(403).send('A token is required for authentication')
    }
    try {
        const decoded = jwt.verify(token, secret )
        req.claims = token
    } catch (error) {
        return res.status(401).send('Invalid Token')
        
    }
    return next()

}
export const verifyService = (userData, done)=>{
    if(userData===undefined){
        return false
    }else{
        findUser(userData.email, async(err, result)=>{
            if(err){
                return err
            }else{ //use bcrypt here to compare password
                const passwordMatch = await bcrypt.compare(userData.password, result.password)
                if(!passwordMatch){
                    return done("Incorrect password")
                }
                return done(null, result)
            }
        })
    }
}

export const createJWT = ()=>{
    const payload = {
        role : 'USER',
        email: 'userVerfied.email',
        name: 'userVerfied.name'
    }
    const token = jwt.sign(payload, secret, {
        expiresIn: 3600
    })
   
  return token
}

export const registerService = (userData, done)=>{
    findUser(userData.email, (err, result)=>{
        if(err){
            return done(err.message)
        }else{
            if(result.length > 1){
                console.log(result)
                return done( 'User Already Exists')
            }else{
                console.log('1' , result);
                addUser(userData, (err, result)=>{
                    console.log('2', result);
                    if(err){
                        done(err.message)
                    }
                    return done(null, result)
                })
            }
        }
    })
}

export const loginService = ({email, password}, done)=>{
    verifyService({email, password}, (err, userVerfied)=>{
        if(err){
            return err
        }
        if(userVerfied){
            const jwtToken = createJWT(userVerfied)
            done(null, jwtToken)
        }else{
            done({error: "User not verfied"})
        }
    })
}

