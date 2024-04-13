import mongoose from "mongoose";
import slug from "slug"

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: false,
        trim: true,
        maximumLength: [100, 'Name of Book should not be longer than 100 characters']
    },
    slug: String,
    author : {
        type: String,
        required: true,
        unique: false,
        trim: true,
        maximumLength: [30, 'Authors name should not be more than 30 characters']
    },
    category: {
        type: String,
        enum: ['Non-Fiction', 'Fiction'],
        required: true
    },
    genre: [{
        type: String,
        required: true,
        enum: ["Biography", "Contemporary", "Tragedy", "Rural", "Comedy", "Romance"]
    }],
    about: {
        type: String,
        required: true,
        maximumLength: [500, 'tell us about the book']
    },
    price:{
        type: Number,
        required: true
    },
    canRent: {
        type: Boolean,
        default: true
    },
    rentPrice: Number,
    discount: {
        type: Boolean,
        default: false
    } 
})

// creating book slug
bookSchema.pre('save', function(next) {
    this.slug = slug(this.name, {lower: true})
    console.log('Slug ran on ' + this.name );
    next()
})

bookSchema.pre('save', function(next){
    if(this.rentPrice===undefined){
        this.rentPrice = ((this.price/3).toFixed(2))
    }else{
        this.rentPrice = this.rentPrice
    }
    console.log('calc rent price')
    next()
})

bookSchema.index({author: 1, name: 1}, {unique: true}) //prevents more than one document with the same autor and name

const Books = mongoose.model('Books', bookSchema)
export default Books