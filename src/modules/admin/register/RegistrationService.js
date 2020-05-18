const registrationQuery = require('./RegistrationQuery')
const exception = require('../../../utility/CustomException')
const pwd = require('../../../utility/PasswordManager')
const mailer = require('../../../utility/Mailer')
var fs = require('fs');

async function register(request) {
    try {
        if (await isUserNameEligibleForRegistration(request.username)) {
            let password = request.password
            request = buildRegistrationDetails(request)
            let affectedRows = await registrationQuery.saveUserDetails(request)
            if (affectedRows == 1) {
                sendMail(request.email_id, password, request.username)
                return { registrationSuccesful: true }
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
    fs.readFile('./RegistrationMail.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        let sub = 'Welcome to Cervello Skill Matrix!'
        data = data.replace('{PASSWORD}', password).replace('{USERNAME}', userName)
        mailer.sendMail(toMailId, sub, null, data)
    });

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