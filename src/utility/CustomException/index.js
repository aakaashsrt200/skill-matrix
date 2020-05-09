const UserNameInvalidException = require('./UserNameInvalidException')
const PasswordInvalidException = require('./PasswordInvalidException')
const UserNameAlreadyExistException = require('./UserNameAlreadyExistException')
const DatabaseException = require('./DatabaseException')
const OtpInvalidException = require('./OtpInvalidException')
const UserIdInvalidException = require('./UserIdInvalidException')

module.exports = {
    UserNameInvalidException: new UserNameInvalidException(),
    PasswordInvalidException: new PasswordInvalidException(),
    UserNameAlreadyExistException: new UserNameAlreadyExistException(),
    DatabaseException: new DatabaseException(),
    OtpInvalidException: new OtpInvalidException(),
    UserIdInvalidException: new UserIdInvalidException()
}