const Router = require('express')
const router = Router()
const profileService = require('./ProfileService')

router.get('/', async (req, res) => {
    let response = await profileService.getProfile(req.query.user_id)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/edit', async (req, res) => {
    let response = await profileService.editProfile(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/dp/upload', async (req, res) => {
    let response = await profileService.uploadDp(req.body,req.files)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

module.exports = router