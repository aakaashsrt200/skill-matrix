const Router = require('express')
const router = Router();
const domainService = require('./domain/DomainService')
const skillService = require('./skill/SkillService')
const userService = require('./user/UserService')

router.get('/domain', async (req, res) => {
    let response = await domainService.getAllDomain(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.get('/skill', async (req, res) => {
    let response = await skillService.getSkill(req.query.domain)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.get('/user-skill', async (req, res) => {
    let response = await userService.getUserSkill(req.query.user_id)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

module.exports = router