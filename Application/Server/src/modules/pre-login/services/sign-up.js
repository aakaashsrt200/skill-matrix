const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')
const mailer = require('../../../utility/Mailer')
const fs = require('fs')
const path = require('path')

async function signUp(request) {
	try {
		if (await isEmailIdEligibleForSignup(request.email_id)) {
			let response = await query.getAllAdminMailId()
			if (response.length > 0) {
				let adminMailId = []
				response.forEach((admin) => {
					adminMailId.push(admin.email_id)
				})
				sendMail(adminMailId, request.email_id)
			}
			return { status: true }
		} else {
			return exception.EmailIdAlreadyExistException
		}
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

function sendMail(toMailId, email_id) {
	fs.readFile(path.join(rootPath, '/src/repository/resource/SignUpMail.txt'), 'utf8', function (err, data) {
		if (err) {
			console.log(err)
		}
		let sub = 'New Account Registration for Cervello Portal'
		data = data.replace(/{email_id}/g, email_id)
		mailer.sendMail(toMailId, sub, null, data)
	})
}

async function isEmailIdEligibleForSignup(emailId) {
	let response = await query.getUserByEmailId(emailId)
	return !response || (response && response.length == 0)
}

module.exports = {
	signUp,
}
