// Package for generating id numbers
const nanoid = require('nanoid');
// Adds async to fs functions
const fse = require('fs-extra');
// Notes router declaration
const notes = require('express').Router();

// GET method that returns all notes
notes.get('/', (req, res) => {
    fse.readJSON('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(data)
        }
    })
})

// POST method for adding a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to save a note.`);

    const { title, text } = req.body;
    console.log(req.body)

    if (title && text) {
        const newNote = {
            title,
            text,
            id: nanoid(4),
        }
        console.log(`New Note: ${JSON.stringify(newNote)}`)
        fse.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                console.log(parsedData)
                fse.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4),
                (err) => {
                    err ? console.error(err) : res.json(`Note added successfully.`);
                })
            }
        })
    } else {
        res.error('Error when adding note.');
    }
    
})

// DELETE method for deleting a nore
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fse.readJson('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const result = data.filter(note => note.id != noteId);
            fse.writeJson('./db/db.json', result);
            res.json(`Note ${req.noteId} has been deleted.`);
        }
    })
})

module.exports = notes;