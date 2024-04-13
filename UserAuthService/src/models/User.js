import mongoose from "mongoose";
import slug from "slug";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input a name'],

    },

    level : {
        type: String,
        enum : ['Beginner Reader', 'Intermediate Reader', 'Friendly Reader', 'Top Reader', 'Ultimate Reader',],
        default: 'Beginner Reader'
    },
    email:{
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        emailRegex : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },

    role: {
        type: String,
        enum : ['reader', 'publisher'],
        default: "reader"
    },
    password: {
        type: String,
        required: [true, 'Please enter a password that has a number, a special character and uppercase and lowercase letters' ],
        display: false,
        minlegnth: 6,
        // passwordRegex: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Please enter a password that is a minimum of 6 letters and fulfils the given criteria"]
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
            },
            message: "Please enter a password that fulfills the given criteria"
        }
    }, 

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
    
})

// encrypting password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.pre('save', function (next) {
    this.slug = slug(this.name, {lower:true})
    console.log('Slug ran on ' + this.name );
    next()
    
})

UserSchema.methods.getSignedJWTtoken = function(){
    return JWT.sign({id: this._id}, process.env.jwtSecret, {
        expiresIn: process.env.jwtExpire
    })
}

const Users = mongoose.model('Users', UserSchema)
export default Users