const loginQuery = require('./LoginQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')

async function loginAuthentication(loginCredentials) {
    try {
        let response = await loginQuery.getUserByNameAndType(loginCredentials)
        if (response) {
            if (pwd.validatePassword(loginCredentials.password, response.password)) {
                if (!response.email_verified) {
                    loginCredentials.resetPasswordRequired = true
                }
                loginCredentials.user_id  = response.user_id
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