const express = require('express')
const router = express.Router()
const User = require('../models/User')
const verifyToken = require('../routes/verify')

// INDEX
router.get('/', async (req, res) => {
	try {
		const user = await User.find()
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})

// CREATE
router.post('/store', verifyToken, async (req, res) => {
	const userRequest = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		address: req.body.address
	})

	try {
		const user = await userRequest.save()
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})

// READ
router.get('/show/:id', verifyToken, async (req, res) => {
	try {
		const user = await User.find({_id: req.params.id})
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})

// UPDATE
router.put('/update/:id', verifyToken, async (req, res) => {
	try {
		const userRequest = await User.updateOne({_id: req.params.id}, {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			address: req.body.address
		})
		res.json(userRequest)
	}catch(err) {
		res.json({message: err})
	}
})

// DELETE
router.delete('/delete/:id', verifyToken, async (req, res) => {
	try {
		const user = await User.deleteOne({_id: req.params.id})
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})


module.exports = router