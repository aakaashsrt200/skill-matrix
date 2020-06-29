const ERROR_CODE = require('./ErrorCodes')
class AttachmentsNotFoundException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 500
		this.errorCode = errorCode || ERROR_CODE.ATTACHMENTS_NOT_FOUND
		this.errorMessage = errorMessage || 'Attachments Not Found'
	}
}
module.exports = AttachmentsNotFoundException
