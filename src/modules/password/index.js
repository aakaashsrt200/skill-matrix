const Router = require('express')
const router = Router()
const passwordService = require('./PasswordService')

router.post('/first-time', async (req, res) => {
    let response = await passwordService.forceResetPassword(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/reset', async (req, res) => {
    let response = await passwordService.resetPassword(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/forgot-initiate', async (req, res) => {
    let response = await passwordService.forgotPasswordInitiate(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

router.post('/forgot-complete', async (req, res) => {
    let response = await passwordService.forgotPasswordComplete(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

module.exports = router