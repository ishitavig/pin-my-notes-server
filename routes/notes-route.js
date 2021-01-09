// Import express
const express = require('express')

// Import notes-controller
const notesRoutes = require('./../controllers/notes-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all notes
// In server.js, notes route is specified as '/notes'
// this means that '/all' translates to '/notes/all'
router.get('/all', notesRoutes.notesAll)

// Add route for GET request to retrieve all notes
// In server.js, notes route is specified as '/notes'
// this means that '/all' translates to '/notes/all'
router.get('/:userId', notesRoutes.userNotes)

// Add route for POST request to create new note
// In server.js, notes route is specified as '/notes'
// this means that '/create' translates to '/notes/create'
router.post('/create/:userId', notesRoutes.notesCreate)

// Add route for PUT request to delete specific note
// In server.js, notes route is specified as '/notes'
// this means that '/delete' translates to '/notes/delete'
router.put('/delete', notesRoutes.notesDelete)

// Add route for PUT request to reset notes list
// In server.js, notes route is specified as '/notes'
// this means that '/reset' translates to '/notes/reset'
router.put('/reset', notesRoutes.notesReset)

// Export router
module.exports = router