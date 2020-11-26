const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		max: 100
	},
	email: {
		type: String,
		required: true,
		max: 100
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	name: {
		type: String,
		required: true,
		max: 100
	},
	address: {
		type: String,
		default: null
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('User', UserSchema)