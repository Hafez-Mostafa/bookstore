import { mongoose } from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
    name: {
        type: String, required: true
    },
    bio: {
        type: String,
    },
    birthDate:{type:  Date , required:true},
    books: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        title: String
    }],

},{timestamps:true})


const authorModel = mongoose.model('Author', authorSchema);
export default authorModel