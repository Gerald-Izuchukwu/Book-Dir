import Users from "../models/Users.js"
export async function findUser(email, done) {
    try {
        const userFetched = await Users.find({email})
        console.log(userFetched)
        done(null, userFetched)
    } catch (error) {
        console.error(error);
        done(error, null);
        
    }    
}
export async function registerService (userData, done){
    try {
        await Users.insertMany(userData)
        done(null, userData)
    
    } catch (error) {
        console.log(error)
        done(error, null)
    }
}

