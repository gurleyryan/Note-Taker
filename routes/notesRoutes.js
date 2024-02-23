const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for a specific note
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for a new note
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in creating new note.');
    }
});

// DELETE Route for a specific note
notes.delete("/:id", async (req, res) => {
    try {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            const db = JSON.parse(data);
            const index = db.findIndex((notes) =>
                notes.id === req.params.id
            );
            db.splice(index, 1);
            writeToFile('./db/db.json', db);
        })
        location.reload();
        res.status(200).json({ status: 'success' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = notes;