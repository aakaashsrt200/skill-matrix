const ERROR_CODE = require('./ErrorCodes')
class EmailIdAlreadyExistException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 403
		this.errorCode = errorCode || ERROR_CODE.ALREADY_EXIST_USER_NAME
		this.errorMessage = errorMessage || 'User already exist'
	}
}
module.exports = EmailIdAlreadyExistException
