import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    content: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//model
const Note = mongoose.model('Note', noteSchema);

export default Note;