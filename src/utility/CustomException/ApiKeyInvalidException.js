const ERROR_CODE = require('./ErrorCodes')
class ApiKeyInvalidException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 403
		this.errorCode = errorCode || ERROR_CODE.ACCESS_DENIED
		this.errorMessage = errorMessage || 'Unauthorized'
	}
}
module.exports = ApiKeyInvalidException
