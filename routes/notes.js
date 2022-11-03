const nanoid = require('nanoid');
const fse = require('fs-extra');
const notes = require('express').Router();


notes.get('/', (req, res) => {
    console.log('Notes Loaded');
    fse.readJSON('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(data)
        }
    })
})

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
                    err ? console.error(err) : console.log('Note added successfully!');
                })
            }
        })
    }
})

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