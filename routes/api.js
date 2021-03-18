import express from 'express';

const router = express.Router();

import Note from '../models/note.js'

//routes

router.get('/api', (req, res) => {
    Note.find({}).then((data) => {
        console.log('Data: ', data);
        res.json(data)
    }).catch((err) => {
        console.log('Error: ', err);
    })

})

router.post('/save', (req, res) => {
    const data = req.body;
    console.log(data);
    const newNote = new Note(data)
    newNote.save((err) => {
        if (err) {
            res.status(500).json({ msg: "there was an error saving your data" })
        } else {
            res.json({ msg: "your data has been added successfully" })
        }
    })

})

export default router;