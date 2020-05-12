const passwordQuery = require('./PasswordQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')
const mailer = require('../../utility/Mailer')
const OTP = require('../../utility/GenerateOtp')

async function forceResetPassword(request) {
    try {
        let affectedRowsPassword = await updatePassword(request.password, request.user_id)
        let affectedRowsEmailStatus
        if (affectedRowsPassword == 1) {
            affectedRowsEmailStatus = await passwordQuery.setEmailVerifiedStatus(request.user_id)
        }
        return (affectedRowsEmailStatus && affectedRowsEmailStatus == 1 && affectedRowsPassword == 1) ? { resetPasswordSuccesful: true } : exception.UserIdInvalidException
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function resetPassword(request) {
    try {
        let affectedRows = await updatePassword(request.password, request.user_id)
        if (affectedRows == 1) {
            return { resetPasswordSuccesful: true }
        }
        return exception.UserIdInvalidException
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function forgotPasswordInitiate(request) {
    try {
        let response = await passwordQuery.getUserByUserName(request.username)
        if (response) {
            response.otp = OTP.generate()
            await passwordQuery.saveOtp(response.user_id, response.otp)
            sendMail(response.email_id, response.otp)
            return {
                otpDispachedSuccesful: true,
                user_id: response.user_id
            }
        }
        return exception.UserNameInvalidException
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function forgotPasswordComplete(request) {
    try {
        let response = await passwordQuery.getUserByUserIdAndOtp(request.user_id, request.otp)
        if (response) {
            let affectedRows = await updatePassword(request.password, request.user_id)
            await passwordQuery.saveOtp(request.user_id, null)
            if (affectedRows == 1) {
                return { resetPasswordSuccesful: true }
            }
            return exception.UserIdInvalidException
        }
        return exception.OtpInvalidException
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function updatePassword(password, user_id) {
    password = pwd.encodePassword(password)
    return await passwordQuery.saveNewPassword(password, user_id)
}

function sendMail(toMailId, otp) {

    let sub = 'Skill Matrix : OTP to reset password'
    let html = `<h4>Hi, </h4><h4>Your OTP to rest your password is ${otp}.</h4><h5>Regards,</h5><h5>Team Cervello</h5>`
    mailer.sendMail(toMailId, sub, null ,html)
}

module.exports = {
    forceResetPassword,
    resetPassword,
    forgotPasswordInitiate,
    forgotPasswordComplete,
}