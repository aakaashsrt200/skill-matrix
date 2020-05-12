const registrationQuery = require('./RegistrationQuery')
const exception = require('../../../utility/CustomException')
const pwd = require('../../../utility/PasswordManager')
const mailer = require('../../../utility/Mailer')

async function register(request) {
    try {
        if (await isUserNameEligibleForRegistration(request.username)) {
            let password = request.password
            request = buildRegistrationDetails(request)
            let affectedRows = await registrationQuery.saveUserDetails(request)
            if (affectedRows == 1) {
                sendMail(request.email_id, password, request.username)
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
    let sub = 'Welcome to Cervello Skill Matrix!'
    let html = `<h4>Hi, </h4><h4>Your account for Cervello Skill Matrix has been created.Kindly login to the portal by clicking on the link using the below credentials.</h4><h5>Username : ${userName}</h5><h5>Password : ${password}</h5><h5>Url: <a href="https://www.google.com/">www.google.com</a></h5><h5>Regards,</h5><h5>Team Cervello</h5>`
    mailer.sendMail(toMailId, sub, null,html)
}

function buildRegistrationDetails(request) {
    request.password = pwd.encodePassword(request.password)
    request.email_verified = request.email_verified || 0
    request.created_by = request.created_by || 'Admin'
    request.user_type = request.user_type || 'User'
    return request
}

async function isUserNameEligibleForRegistration(userName) {
    let response = await registrationQuery.getUserByName(userName)
    return (response && response.length == 0)
}

module.exports = {
    register,
}