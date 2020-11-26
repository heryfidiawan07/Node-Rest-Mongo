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
const Welcome = require('./routes/welcome')
const Auth = require('./routes/auth')
const User = require('./routes/user')

// Routes welcome
app.use('/api', Welcome)
// Routes auth
app.use('/api/auth', Auth)
// Routes auth
app.use('/api/user', User)

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