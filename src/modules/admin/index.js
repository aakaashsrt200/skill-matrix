const Router = require('express')
const router = Router()
const auth = require('./auth')
const skillSet = require('./skill-set')
const profile = require('./profile')
const project = require('./project')

// Login and user-creation related
router.post('/auth/login', async (req, res) => {
	let response = await auth.login(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/auth/register', async (req, res) => {
	let response = await auth.register(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//User profile related
router.get('/profile', async (req, res) => {
	let response = await profile.getProfile(req.query.user_id)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/profile/edit', async (req, res) => {
	let response = await profile.editProfile(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/profile/delete', async (req, res) => {
	let response = await profile.deleteUserProfile(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Skill related
router.get('/skill-set/all', async (req, res) => {
	let response = await skillSet.getDomainAndSkill()
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/skill/add', async (req, res) => {
	let response = await skillSet.addSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/skill/delete', async (req, res) => {
	let response = await skillSet.deleteSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/skill/edit', async (req, res) => {
	let response = await skillSet.editSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Allocation related
router.get('/allocation/project', async (req, res) => {
	let response = await project.getAllProjects()
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/allocation/project/add', async (req, res) => {
	let response = await project.addProjects(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/allocation/project/delete', async (req, res) => {
	let response = await project.deleteProjects(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/allocation/project/edit', async (req, res) => {
	let response = await project.editProjects(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Certification related
router.get('/certification/list', async (req, res) => {})

router.post('/certification/list/add', async (req, res) => {})

router.post('/certification/list/delete', async (req, res) => {})

router.post('/certification/list/edit', async (req, res) => {})

module.exports = router
