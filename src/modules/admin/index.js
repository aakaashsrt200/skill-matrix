const Router = require('express')
const router = Router();
const registrationService = require('./register/RegistrationService')

router.post('/register', async (req, res) => {
    let response = await registrationService.register(req.body)
    if (response instanceof Error) {
        res.status(response.status || 500)
    }
    res.json(response)
})

module.exports = router