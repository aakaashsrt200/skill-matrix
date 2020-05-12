const ERROR_CODE = require('./ErrorCodes')
class UserNameInvalidException extends Error {
    constructor(errorCode, errorMessage, status) {
        super(errorMessage)
        this.name = this.constructor.name
        this.status = status || 403
        this.errorCode = errorCode || ERROR_CODE.INVALID_USER_NAME
        this.errorMessage = errorMessage || 'User name not found'
    }
}
module.exports = UserNameInvalidException