// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "users"
knex.schema
  // Make sure no "users" table exists
  // before trying to create new
  .hasTable('users')
    .then((exists) => {
      if (!exists) {
        // If no "users" table exists
        // create new, with "userId", "name", "email",
        // "password" columns
        // and use "userId" as a primary identification
        // and increment "userId" with every new record (user)
        return knex.schema.createTable('users', (table)  => {
          table.increments('userId').primary()
          table.string('name')
          table.string('email')
          table.string('password')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Create a table in the database called "notes"
knex.schema
  // Make sure no "notes" table exists
  // before trying to create new
  .hasTable('notes')
    .then((exists) => {
      if (!exists) {
        // If no "notes" table exists
        // create new, with "noteId", "userId", "heading",
        // "body" columns
        // and use "noteId" as a primary identification
        // and increment "noteId" with every new record (note)
        // "userId" column is foreign key referenced to "users" table
        return knex.schema.createTable('notes', (table)  => {
          table.increments('noteId').primary()
          table.integer('userId').notNullable().references('userId').inTable('users');
          table.string('heading')
          table.string('body')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Notes\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "users" table
knex.select('*').from('users')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex