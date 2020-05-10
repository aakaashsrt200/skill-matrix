const loginQuery = require('./LoginQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')

async function loginAuthentication(request) {
    try {
        let response = await loginQuery.getUserByNameAndType(request.username,request.user_type)
        if (response) {
            if (pwd.validatePassword(request.password, response.password)) {
                response.email_verified = response.email_verified == 0 ? false : true
                delete response.password
                delete response.user_type
                return response
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