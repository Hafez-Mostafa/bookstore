import { mongoose } from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    authorId: {
        type:Schema.Types.ObjectId,ref:"Author"
    },
    publishedDate:{ type:Date,
    default:Date.now}

},{timestamps:true})

const bookModel = model('Book', bookSchema);
export default bookModel