const ERROR_CODE = require('./ErrorCodes')
class OtpInvalidException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 403
		this.errorCode = errorCode || ERROR_CODE.INVALID_OTP
		this.errorMessage = errorMessage || 'Incorrect OTP'
	}
}
module.exports = OtpInvalidException
