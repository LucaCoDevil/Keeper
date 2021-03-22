const express = require('express');

const router = express.Router();

const Note = require('../models/note.js')

//routes

router.get('/api', (req, res) => {
    Note.find({}).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(500).json({ msg: "there was an error finding data" })
    })

})

router.post('/save', (req, res) => {
    const data = req.body;
    const newNote = new Note(data)
    newNote.save((err) => {
        if (err) {
            res.status(500).json({ msg: "there was an error saving your data" })
        } else {
            res.json({ msg: "your data has been added successfully" })
        }
    })

})

router.post('/delete', (req, res) => {
    const data = req.body;
    Note.findByIdAndRemove({ _id: data._id }).then(() => {
            res.json({ msg: 'data removed from database ' })
        }).catch(() => {
            res.status(500).json({ msg: 'server error when deleting data' })
        })
        // Note.findByIdAndRemove({ _id: data }).then(() => {
        //     res.json({ msg: "found and deleted note" })
        // }).catch((err) => {
        //     res.status(500).json({ msg: "tehre was an error deleting your data" })
        // })
})

module.exports = router;