const UserNameInvalidException = require('./UserNameInvalidException')
const PasswordInvalidException = require('./PasswordInvalidException')
const UserNameAlreadyExistException = require('./UserNameAlreadyExistException')
const DatabaseException = require('./DatabaseException')

module.exports = {
    UserNameInvalidException : new UserNameInvalidException(),
    PasswordInvalidException : new PasswordInvalidException(),
    UserNameAlreadyExistException : new UserNameAlreadyExistException(),
    DatabaseException : new DatabaseException(),
}