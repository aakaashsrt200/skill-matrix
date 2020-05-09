const registrationQuery = require('./RegistrationQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')
const mailer = require('../../utility/Mailer')

async function register(registrationDetails) {
    try {
        if (await isUserNameEligibleForRegistration(registrationDetails.username)) {
            let password = registrationDetails.password
            registrationDetails = buildRegistrationDetails(registrationDetails)
            let affectedRows = await registrationQuery.saveUserDetails(registrationDetails)
            if (affectedRows == 1) {
                sendMail(registrationDetails.email_id, password, registrationDetails.username)
                return {registrationSuccesful : true}
            } else {
                return { registrationSuccesful: false }
            }
        } else {
            return exception.UserNameAlreadyExistException
        }
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

function sendMail(toMailId, password, userName) {
    mailer.sendMail(toMailId, 'Test', `${password}\n${userName}`)
}

function buildRegistrationDetails(registrationDetails) {
    registrationDetails.password = pwd.encodePassword(registrationDetails.password)
    registrationDetails.email_verified = registrationDetails.email_verified || 0
    registrationDetails.created_by = registrationDetails.created_by || 'Admin'
    registrationDetails.user_type = registrationDetails.user_type || 'User'
    return registrationDetails
}

async function isUserNameEligibleForRegistration(userName) {
    let response = await registrationQuery.getUserByName(userName)
    return (response && response.length == 0)
}

module.exports = {
    register,
}