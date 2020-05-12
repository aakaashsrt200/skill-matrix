const ERROR_CODE = require('./ErrorCodes')
class UserIdInvalidException extends Error {
    constructor(errorCode, errorMessage, status) {
        super(errorMessage)
        this.name = this.constructor.name
        this.status = status || 403
        this.errorCode = errorCode || ERROR_CODE.INVALID_USER_ID
        this.errorMessage = errorMessage || 'User Id invalid'
    }
}
module.exports = UserIdInvalidException