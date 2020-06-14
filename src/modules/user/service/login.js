const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')
const pwd = require('../../../utility/PasswordManager')

async function login(request) {
	try {
		let dbResponse = await query.getUserByUserName(request.username)
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

module.exports = {
	login,
}
