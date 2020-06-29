const ERROR_CODE = require('./ErrorCodes')
class PasswordInvalidException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 403
		this.errorCode = errorCode || ERROR_CODE.INVALID_PASSWORD
		this.errorMessage = errorMessage || 'Incorrect password'
	}
}
module.exports = PasswordInvalidException
