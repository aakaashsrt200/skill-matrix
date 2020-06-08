const Router = require('express')
const router = Router()
const signUp = require('./services/sign-up')

// Signup
router.post('/sign-up', async (req, res) => {
	let response = await signUp.signUp(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

module.exports = router
