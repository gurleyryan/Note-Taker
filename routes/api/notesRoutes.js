const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils');

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

module.exports = notes;