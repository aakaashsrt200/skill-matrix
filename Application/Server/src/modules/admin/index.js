const Router = require('express')
const router = Router()
const auth = require('./services/auth')
const skillSet = require('./services/skill-set')
const profile = require('./services/profile')
const allocation = require('./services/allocation')
const certification = require('./services/certification')
const designationAndRole = require('./services/designation')
const education = require('./services/education')
const language = require('./services/language')

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

router.post('/skill-set/add', async (req, res) => {
	let response = await skillSet.addSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/delete', async (req, res) => {
	let response = await skillSet.deleteSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/skill-set/edit', async (req, res) => {
	let response = await skillSet.editSkill(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Allocation related
router.get('/allocation/project', async (req, res) => {
	let response = await allocation.getAllProjects()
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/allocation/project/add', async (req, res) => {
	let response = await allocation.addProjects(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/allocation/project/delete', async (req, res) => {
	let response = await allocation.deleteProjects(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/allocation/project/edit', async (req, res) => {
	let response = await allocation.editProjects(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Certification related
router.get('/cert/all', async (req, res) => {
	let response = await certification.getDomainAndCertification(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/cert/add', async (req, res) => {
	let response = await certification.addCertification(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/cert/delete', async (req, res) => {
	let response = await certification.deleteCertification(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/cert/edit', async (req, res) => {
	let response = await certification.editCertification(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Designation and Role related
router.get('/desig-role/all', async (req, res) => {
	let response = await designationAndRole.getDesignationAndRole(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/desig-role/add', async (req, res) => {
	let response = await designationAndRole.addDesignationAndRole(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/desig-role/delete', async (req, res) => {
	let response = await designationAndRole.deleteDesignationAndRole(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/desig-role/edit', async (req, res) => {
	let response = await designationAndRole.editDesignationAndRole(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Education related
router.get('/education/all', async (req, res) => {
	let response = await education.getEducation(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/education/add', async (req, res) => {
	let response = await education.addEducation(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/education/delete', async (req, res) => {
	let response = await education.deleteEducation(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/education/edit', async (req, res) => {
	let response = await education.editEducation(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

//Language related
router.get('/language/all', async (req, res) => {
	let response = await language.getLanguage(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/language/add', async (req, res) => {
	let response = await language.addLanguage(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/language/delete', async (req, res) => {
	let response = await language.deleteLanguage(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

router.post('/language/edit', async (req, res) => {
	let response = await language.editLanguage(req.body)
	if (response instanceof Error) {
		res.status(response.status || 500)
	}
	res.json(response)
})

module.exports = router
