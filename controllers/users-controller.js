// Import database
const knex = require('./../db')
const jwt = require('jsonwebtoken');

// Retrieve all users
exports.usersAll = async (req, res) => {
  // Get all users from database
  knex
    .select('*') // select all records
    .from('users') // from 'users' table
    .then(userData => {
      // Send users extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving users: ${err}` })
    })
}

// Login a user
exports.login = async (req, res) => {
    // Get a user from database
    knex
      .select('*') // select all records
      .from('users') // from 'users' table
      .where({email: req.body.email, password: req.body.password})
      .then(userData => {
        // Send users extracted from database in response
        const token = jwt.sign({ data: userData }, 'secretcode');
        res.json({...userData[0], token: token})
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving users: ${err}` })
      })
  }

// Create new user
exports.usersCreate = async (req, res) => {
  // Add new user to database
  knex('users')
    .insert({ // insert new record, a user
      'name': req.body.name,
      'email': req.body.email,
      'password': req.body.password,
    })
    .then(() => {
      // Send a success message in response
      res.json({ name: req.body.name, email: req.body.email })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating user: ${req.body.name} with error: ${err}` })
    })
}

// Remove specific user
exports.usersDelete = async (req, res) => {
  // Find specific user in the database and remove it
  knex('users')
    .where('userId', req.body.userId) // find correct record based on userId
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `User ${req.body.userId} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting user ${req.body.userId} with error: ${err}` })
    })
}

// Remove all users on the list
exports.usersReset = async (req, res) => {
  // Remove all users from database
  knex
    .select('*') // select all records
    .from('users') // from 'users' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Users list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting users list: ${err}.` })
    })
}