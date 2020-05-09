const loginQuery = require('./LoginQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')

async function loginAuthentication(loginCredentials) {
    try {
        let response = await loginQuery.getUserByNameAndType(loginCredentials)
        if (response) {
            if (pwd.validatePassword(loginCredentials.password, response.password)) {
                loginCredentials.resetPasswordRequired = response.email_verified ? false : true
                loginCredentials.user_id = response.user_id
                loginCredentials.email_id = response.email_id
                delete loginCredentials.password
                delete loginCredentials.user_type
                return loginCredentials
            }
            return exception.PasswordInvalidException
        }
        return exception.UserNameInvalidException
    } catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    loginAuthentication,
}