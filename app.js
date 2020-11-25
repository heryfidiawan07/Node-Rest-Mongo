const express = require('express')
const app = express()
const mongoose = require('mongoose')
const parser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// Middleware
// app.use(parser.urlencoded({ extended: false }));
app.use(parser())
app.use(cors())

// Import routes
const Route = require('./routes/web')

// Routes example
app.use('/', Route)

// DB Connection
mongoose.connect(process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection

db.on('error', console.error.bind(console, 'Database error connection !'))
db.once('open', () => {
	console.log('Database is connected !')
})

// Listening
app.listen(process.env.PORT, () => {
	console.log(`Server running in ${process.env.PORT} `)
})