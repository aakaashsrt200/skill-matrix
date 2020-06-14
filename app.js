const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./src/routes.js')
const connection = require('./src/utility/GetDbConnection')
const api = require('./src/utility/ApiKeyValidator')
const exception = require('./src/utility/CustomException')
const apiKey = require('./src/utility/GenerateApiKey')
require('dotenv').config()

var fileupload = require('express-fileupload')
app.use(fileupload())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
global.db = connection
global.rootPath = __dirname
/*
app.use('*', async (req, res, next) => {
	try {
		if (!req.baseUrl.includes('profile_pic_')) {
			let isValid = await api.validateKey(req.query.api_key)
			if (!isValid) {
				res.status(403)
				res.json(exception.ApiKeyInvalidException)
			}
		}
		next()
	} catch (e) {
		res.json(exception.ApiKeyInvalidException)
	}
})*/
/*
app.use('*', async (req, res, next) => {
	console.log('---------------------------------------------------------------------------------------')
	var dt = new Date()
	let date = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
		.getDate()
		.toString()
		.padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt
		.getHours()
		.toString()
		.padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt
		.getSeconds()
		.toString()
		.padStart(2, '0')}`
	let start = Date.now()
	console.log('START : ', date)
	console.log('URL : ', req.originalUrl)
	console.log('METHOD : ', req.method)
	if (req.method !== 'GET') {
		console.log('REQUEST BODY : ', req.body)
	}
	const defaultWrite = res.write
	const defaultEnd = res.end
	const chunks = []
	res.write = (...restArgs) => {
		chunks.push(Buffer.from(restArgs[0]))
		defaultWrite.apply(res, restArgs)
	}
	res.end = (...restArgs) => {
		let end = Date.now()
		if (restArgs[0]) {
			chunks.push(Buffer.from(restArgs[0]))
		}
		const body = Buffer.concat(chunks).toString('utf8')
		console.log('RESPONSE BODY : ', JSON.parse(body))
		console.log('RESPONSE STATUS_CODE : ', res.statusCode)
		console.log('RESPONSE TIME : ', end - start)
		console.log('---------------------------------------------------------------------------------------')
		console.log('\n')
		defaultEnd.apply(res, restArgs)
	}
	next()
})*/
app.use('/api/user', routes.user)
app.use('/api/admin', routes.admin)
app.use('/api/generate-api-key', async function (req, res) {
	let key = await apiKey.generateApiKey(req.headers.authorization)
	if (key) {
		res.json({ api_key: key })
	} else {
		res.status(403)
		res.json({
			name: 'InvalidToken',
			status: 403,
			errorCode: 'INVALID_TOKEN',
			errorMessage: 'Auth token is not valid',
		})
	}
})
app.use('/api/pre-login', routes.preLogin)
app.listen(process.env.APPLICATION_PORT, () =>
	console.log(`Skill-matrix app listening on port ${process.env.APPLICATION_PORT}!`)
)
