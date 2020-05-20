const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')
const pwd = require('../../../utility/PasswordManager')
const mailer = require('../../../utility/Mailer')
const OTP = require('../../../utility/GenerateOtp')
const fs = require('fs')

async function forceResetPassword(request) {
	try {
		let affectedRows = await updatePassword(request.password, request.user_id)
		await query.setEmailVerifiedStatus(request.user_id, true)
		return affectedRows == 1 ? { status: true } : exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function resetPassword(request) {
	try {
		let affectedRows = await updatePassword(request.password, request.user_id)
		return affectedRows == 1 ? { status: true } : exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function forgotPasswordInitiate(request) {
	try {
		let response = await query.getUserByUserName(request.username)
		if (response) {
			response.otp = OTP.generate()
			await query.saveOtp(response.user_id, response.otp)
			sendMail(response.email_id, response.otp)
			return {
				status: true,
				user_id: response.user_id,
			}
		}
		return exception.UserNameInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function forgotPasswordComplete(request) {
	try {
		let response = await query.getUserByUserIdAndOtp(request.user_id, request.otp)
		if (response) {
			let affectedRows = await updatePassword(request.password, request.user_id)
			await query.saveOtp(request.user_id, null)
			return affectedRows == 1 ? { status: true } : exception.UserIdInvalidException
		}
		return exception.OtpInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function updatePassword(password, user_id) {
	password = pwd.encodePassword(password)
	return await query.saveNewPassword(password, user_id)
}

function sendMail(toMailId, otp) {
	fs.readFile('./ResetPasswordMail.txt', 'utf8', function (err, data) {
		if (err) {
			console.log(err)
		}
		let sub = 'Skill Matrix : OTP to reset password'
		data = data.replace('{OTP}', otp)
		mailer.sendMail(toMailId, sub, null, data)
	})
}

module.exports = {
	forceResetPassword,
	resetPassword,
	forgotPasswordInitiate,
	forgotPasswordComplete,
}
