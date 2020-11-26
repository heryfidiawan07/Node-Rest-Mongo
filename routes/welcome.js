const express = require('express')
const router = express.Router()

// WELCOME
router.get('/', (req, res) => {
	res.send('Welcome to api')
})

module.exports = router