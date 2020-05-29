const ERROR_CODE = require('./ErrorCodes')
class InvalidSkillIdException extends Error {
	constructor(errorCode, errorMessage, status) {
		super(errorMessage)
		this.name = this.constructor.name
		this.status = status || 403
		this.errorCode = errorCode || ERROR_CODE.INVALID_SKILL_ID
		this.errorMessage = errorMessage || 'Invalid Skill Id'
	}
}
module.exports = InvalidSkillIdException
