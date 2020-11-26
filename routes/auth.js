const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Import validation
const { registerValidation } = require('../validator/auth')

// Register
router.post('/register', async (req, res) => {
	// Validation
	const { error } = registerValidation(req.body)
	if (error) return res.status(400).json({
		status: res.statusCode,
		message: error.details[0].message
	})

	// Unique Email
	const email = await User.findOne({email: req.body.email})
	if (email) return res.status(400).json({
		status: res.statusCode,
		message: 'Email already registered !'
	})

	// Password Hash
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(req.body.password, salt)

	const userRequest = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hash,
	})

	try {
		const user = await userRequest.save()
		res.json(user)
	}catch(err) {
		res.status(400).json({
			status: res.statusCode,
			message: err
		})
	}
})

router.post('/login', async (req, res) => {
	const user = await User.findOne({email: req.body.email})

	// If email registered
	if (!user) return res.status(400).json({
		status: res.statusCode,
		message: 'Email failed !'
	})

	// Check password
	const password = await bcrypt.compare(req.body.password, user.password)
	if (!password) return res.status(400).json({
		status: res.statusCode,
		message: 'Password failed !'
	})

	// JWT Token
	const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
	res.header({
		'Content-Type': 'application/json',
		'auth-token': token
	}).json({
		token: token
	})

})

module.exports = router
