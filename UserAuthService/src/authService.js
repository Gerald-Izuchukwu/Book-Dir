import jwt from "jsonwebtoken"
const secret = process.env.AUTH_SECRET || 'tryEverythingwithlove'
import {findUser, addUser} from './authDAO.js'
import bcrypt from 'bcryptjs'


export const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(403).send('A token is required for authentication')
    }
    try {
        const decoded = jwt.verify(token, secret )
        console.log(secret)
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
        findUser(userData.email, async(err, userFetched)=>{
            try {
                if(err){
                    return err
                }else{ //use bcrypt here to compare password
                    console.log(secret)
                    const passwordMatch = await bcrypt.compare(userData.password, userFetched[0].password)
                    if(!passwordMatch){
                        return done("Incorrect password")
                    }
                    return done(null, userFetched)
                }
            } catch (error) {
                console.log(error.message)
                return done(error.message)
            }
        })
    }
}

export const createJWT = (userVerfied)=>{
    const payload = {
        role : userVerfied[0].role,
        email: userVerfied[0].email,
        name: userVerfied[0].name
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
            console.log(jwtToken)
            done(null, jwtToken)
        }else{
            done({error: "User not verfied"})
        }
    })
}


