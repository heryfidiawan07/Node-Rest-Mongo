const express = require('express')
const router = express.Router()
const User = require('../models/User')

// WELCOME
router.get('/', (req, res) => {
	res.send('Welcome page')
})

// INDEX
router.get('/user', async (req, res) => {
	try {
		const user = await User.find()
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})

// CREATE
router.post('/user/store', async (req, res) => {
	const userRequest = new User({
		nama: req.body.nama,
		alamat: req.body.alamat
	})

	try {
		const user = await userRequest.save()
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})

// READ
router.get('/user/show/:id', async (req, res) => {
	try {
		const user = await User.find({_id: req.params.id})
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})

// UPDATE
router.put('/user/update/:id', async (req, res) => {
	try {
		const userRequest = await User.updateOne({_id: req.params.id}, {
			nama: req.body.nama,
			alamat: req.body.alamat
		})
		res.json(userRequest)
	}catch(err) {
		res.json({message: err})
	}
})

// DELETE
router.delete('/user/delete/:id', async (req, res) => {
	try {
		const user = await User.deleteOne({_id: req.params.id})
		res.json(user)
	}catch(err) {
		res.json({message: err})
	}
})


module.exports = router