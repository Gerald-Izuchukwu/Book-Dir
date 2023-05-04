import mongoose from "mongoose";
import slug from "slug";

export const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        trim : true,
        maximumLength: [30, 'Authors name should not be more than 30 characters']    
    },
    about: {
        type: String,
        required: false,
        maximumLength: [500, 'tell us about the author']

    },
    books: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Books',
        required: false,
    },
    works: {
        type: mongoose.Schema.ObjectId,
        ref: 'Books',
        required: true
    }
})

AuthorsSchema.pre('save', function (next) {
    this.slug = slug(this.name, {lower: true})
    console.log('Slug ran on ' + this.name );
    next()
    
})

const Authors = mongoose.model('Authors', AuthorsSchema)
export default Authors