const Router = require('express')
const router = Router()
const auth = require('./auth')
const skillSet = require('./skill-set')

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
router.get('/profile', async (req, res) => {})

router.post('/profile/edit', async (req, res) => {})

//Skill related
router.get('/skill-set', async (req, res) => {})

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

router.post('/skill-set/skill/edit', async (req, res) => {})

//Allocation related
router.get('/allocation/project', async (req, res) => {})

router.post('/allocation/project/add', async (req, res) => {})

router.post('/allocation/project/delete', async (req, res) => {})

router.post('/allocation/project/edit', async (req, res) => {})

//Certification related
router.get('/certification/list', async (req, res) => {})

router.post('/certification/list/add', async (req, res) => {})

router.post('/certification/list/delete', async (req, res) => {})

router.post('/certification/list/edit', async (req, res) => {})

module.exports = router
