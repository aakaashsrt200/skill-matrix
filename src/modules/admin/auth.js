const query = require('../../repository/query')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')
const mailer = require('../../utility/Mailer')
const fs = require('fs')
const path = require('path')

async function login(request) {
	try {
		let dbResponse = await query.getUserByNameAndType(request.username, 'admin')
		if (dbResponse) {
			if (pwd.validatePassword(request.password, dbResponse.password)) {
				dbResponse.email_verified = dbResponse.email_verified == 0 ? false : true
				delete dbResponse.password
				delete dbResponse.user_type
				return dbResponse
			}
			return exception.PasswordInvalidException
		}
		return exception.UserNameInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function register(request) {
	try {
		if (await isUserNameEligibleForRegistration(request.username)) {
			let password = request.password
			request = buildRegistrationDetails(request)
			await query.registerUserDetails(request)
			sendMail(request.email_id, password, request.username)
			return { status: true }
		} else {
			return exception.UserNameAlreadyExistException
		}
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

function sendMail(toMailId, password, userName) {
	fs.readFile(path.join(rootPath, '/src/repository/resource/RegistrationMail.txt'), 'utf8', function (err, data) {
		if (err) {
			console.log(err)
		}
		let sub = 'Welcome to Cervello Skill Matrix!'
		data = data.replace('{PASSWORD}', password).replace('{USERNAME}', userName)
		mailer.sendMail(toMailId, sub, null, data)
	})
}

function buildRegistrationDetails(request) {
	request.password = pwd.encodePassword(request.password)
	request.email_verified = request.email_verified || 0
	request.created_by = request.created_by || 'Admin'
	request.user_type = request.user_type || 'User'
	return request
}

async function isUserNameEligibleForRegistration(userName) {
	let response = await query.getUserByUserName(userName)
	return !response || (response && response.length == 0)
}

module.exports = {
	login,
	register,
}
