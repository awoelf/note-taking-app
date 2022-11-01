const id = require('../public/src/id');

const notes = require('express').Router();
1

notes.get('/', (req, res) => {
    console.log('Notes Loaded');
    
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to save a note.`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: id(),
        }
    }
})

module.exports = notes;