const Router = require('express')
const router = Router();
const registrationService = require('./register/RegistrationService')
const skillService = require('./skill/SkillService')

router.post('/register', async (req, res) => {
    let response = await registrationService.register(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/skill/add', async (req, res) => {
    let response = await skillService.addSkill(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/skill/delete', async (req, res) => {
    let response = await skillService.deleteSkill(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

module.exports = router