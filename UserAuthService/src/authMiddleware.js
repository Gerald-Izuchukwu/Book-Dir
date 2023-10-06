import jwt  from "jsonwebtoken"
const secret = process.env.AUTH_SECRET

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

// export default verifyToken