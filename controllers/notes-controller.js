// Import database
const knex = require('./../db')

// Retrieve all notes
exports.notesAll = async (req, res) => {
  // Get all notes from database
  knex
    .select('*') // select all records
    .from('notes') // from 'notes' table
    .then(notesData => {
      // Send notes extracted from database in response
      res.json(notesData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving notes: ${err}` })
    })
}

exports.userNotes = async (req, res) => {
  // Get all notes from database
  knex
    .select('*') // select all records
    .from('notes') // from 'notes' table
    .where({userId: req.params.userId})
    .then(notesData => {
      // Send notes extracted from database in response
      res.json(notesData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving notes: ${err}` })
    })
}

// Create new note
exports.notesCreate = async (req, res) => {
  // Add new note to database
  knex('notes')
    .insert({ // insert new record, a note
      'userId': req.params.userId,
      'heading': req.body.heading,
      'body': req.body.body,
    })
    .then(() => {
      // Send a success message in response
      res.json({ userId: req.body.userId, note: `Heading: ${req.body.heading}, Body: ${req.body.body}` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating note: ${req.body.heading} with error: ${err}` })
    })
}

// Remove specific note
exports.notesDelete = async (req, res) => {
  // Find specific note in the database and remove it
  knex('notes')
    .where('noteId', req.body.noteId) // find correct record based on noteId
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Note ${req.body.noteId} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting note: ${req.body.noteId} with error: ${err}` })
    })
}

// Remove all notes on the list
exports.notesReset = async (req, res) => {
  // Remove all notes from database
  knex
    .select('*') // select all records
    .from('notes') // from 'notes' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Notes list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting notes list: ${err}.` })
    })
}