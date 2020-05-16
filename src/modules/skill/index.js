const Router = require('express')
const router = Router()
const skillService = require('./SkillService')

router.post('/add', async (req, res) => {
    let response = await skillService.addUserSkill(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/delete', async (req, res) => {
    let response = await skillService.deleteUserSkill(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/edit', async (req, res) => {
    let response = await skillService.alterUserSkill(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

module.exports = router