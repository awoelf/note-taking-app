const nanoid = require('nanoid');
const fse = require('fs-extra');

const notes = require('express').Router();


notes.get('/', (req, res) => {
    console.log('Notes Loaded');
    fse.readJSON('./db/db.json')
    .then(data => {
        console.log(data);
        res.json(data)
    })
    .catch(err => {
        console.error(err);
    })
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to save a note.`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: nanoid(4),
        }
    }
})

module.exports = notes;