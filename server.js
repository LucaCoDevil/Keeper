import express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path'
import routes from './routes/api.js'

const app = express();

const PORT = process.env.PORT || 5000;

//connect to database
const MONGODB_URI = 'mongodb+srv://admin:H@ppy1611512@keeper-notes.cgywe.mongodb.net/notes'

mongoose.connect('mongodb://localhost/notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("Database is connected");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//HTTP request logger
app.use(morgan('tiny'));

app.use('/', routes);

app.listen(PORT, (req, res) => {
    console.log(`running on ${PORT}`);
})