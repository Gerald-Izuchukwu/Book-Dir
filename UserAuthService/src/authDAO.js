import Users from "./models/User.js";

export async function findUser(email, done) {
    try {
        const userFetched = await Users.find({email})
        done(null, userFetched)
    } catch (error) {
        console.error(error.message);
        done(error);
        
    }    
}

export async function addUser (userData, done){
    try {
        await Users.create(userData)
        done(null, userData)
    
    } catch (error) {
        console.log(error)
        done(error, null)
    }
}
