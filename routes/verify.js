const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
	const ContentType = req.header('Content-Type')
	const token = req.header('auth-token')

	if (ContentType != 'application/json') return res.status(400).json({
		status: res.statusCode,
		message: 'Content-Type error !'
	})

	if (!token) return res.status(400).json({
		status: res.statusCode,
		message: 'Access Denied !'
	})

	try{
		const verified = jwt.verify(token, process.env.SECRET_KEY)
		req.user = verified
		next()
	}catch(err) {
		res.status(400).json({
			status: res.statusCode,
			message: 'Invalid Token !'
		})
	}
}


module.exports = verify