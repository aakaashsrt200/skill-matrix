const Router = require('express')
const router = Router()
const login = require('./service/login')
const password = require('./service/password')
const profile = require('./service/profile')
const skillSet = require('./service/skill-set')

// Login and password-management related
router.post('/auth/login', async (req, res) => {
	let response = await login.login(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/auth/password/force-reset', async (req, res) => {
	let response = await password.forceResetPassword(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/auth/password/reset', async (req, res) => {
	let response = await password.resetPassword(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/auth/password/forgot/init', async (req, res) => {
	let response = await password.forgotPasswordInitiate(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/auth/password/forgot/complete', async (req, res) => {
	let response = await password.forgotPasswordComplete(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//User profile related
router.get('/profile/edit', async (req, res) => {
	let response = await profile.getProfileForEdit(req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.get('/profile', async (req, res) => {
	let response = await profile.getProfile(req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/profile/edit', async (req, res) => {
	let response = await profile.editProfile(req.body, req.files)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/profile/picture-upload', async (req, res) => {
	let response = await profile.uploadDp(req.body, req.files)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Skill related
router.get('/skill-set/domain', async (req, res) => {
	let response = await skillSet.getAllDomain(req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.get('/skill-set/skill', async (req, res) => {
	let response = await skillSet.getSkill(req.query.domain, req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.get('/skill-set/all', async (req, res) => {
	let response = await skillSet.getDomainAndSkill(req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.get('/skill-set', async (req, res) => {
	let response = await skillSet.getUserSkill(req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/edit', async (req, res) => {
	let response = await skillSet.alterUserSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/delete', async (req, res) => {
	let response = await skillSet.deleteUserSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/add', async (req, res) => {
	let response = await skillSet.addUserSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Allocation related
router.get('/allocation/project', async (req, res) => {})

router.get('/allocation', async (req, res) => {})

router.get('/allocation/edit', async (req, res) => {})

router.get('/allocation/delete', async (req, res) => {})

//certification related
router.get('/cert/list', async (req, res) => {})

router.get('/cert/edit', async (req, res) => {})

router.get('/cert/delete', async (req, res) => {})

router.get('/cert', async (req, res) => {})

module.exports = router
