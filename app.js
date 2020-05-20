const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./src/routes.js')
const connection = require('./src/utility/GetDbConnection')
const api = require('./src/utility/ApiKeyValidator')
const exception = require('./src/utility/CustomException')
require('dotenv').config()

var fileupload = require('express-fileupload')
app.use(fileupload())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
global.db = connection
//To implement api key
/*
app.use('*', async (req, res, next) => {
	console.log(req)
	console.log('URL - ', req.baseUrl)
	console.log('Body - ', req.body)
	if (!req.baseUrl.includes('profile_pic_')) {
		let isValid = await api.validateKey(req.query.api_key)
		if (!isValid) {
			res.status(403)
			res.json(exception.ApiKeyInvalidException)
		}
	}
	next()
})*/
app.use('/api/user', routes.user)
app.use('/api/admin', routes.admin)
app.use(express.static('public'))

app.listen(process.env.APPLICATION_PORT, () =>
	console.log(`Skill-matrix app listening on port ${process.env.APPLICATION_PORT}!`)
)
