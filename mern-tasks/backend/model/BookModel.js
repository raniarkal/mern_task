import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const bookSchema = new Schema({

    title: {
        type: String,
        required: true
        },
    author: {
        type: String,
        required:true
        },
    genre: {
        type: String,
        required:true
     },
    year: {
        type: String,
        required:true
       },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Book', bookSchema);