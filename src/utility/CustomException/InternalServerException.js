const ERROR_CODE = require('./ErrorCodes')
class InternalServerException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 500
		this.errorCode = errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR
		this.errorMessage = errorMessage || 'Internal Server Exception'
	}
}
module.exports = InternalServerException
