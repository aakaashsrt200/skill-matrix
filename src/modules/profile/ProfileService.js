const profileQuery = require('./ProfileQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')

async function getProfile(user_id) {
    try {
        let response = await profileQuery.getUserByUserId(user_id)
        console.log(response)
        if (response) {
            return response
        }
        return exception.UserNameInvalidException
    } catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function editProfile(request) {
    try {
        let affectedRows = await profileQuery.saveUserDetails(request)
        if (affectedRows == 1) {
            let response = await profileQuery.getUserByUserId(request.user_id)
            response.profileUpdatedSuccessfully = true
            return response
        }
        return exception.UserIdInvalidException
    } catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function uploadDp(request, attachments) {
    try {
        console.log(attachments)
        if (!attachments) {
            res.send(exception.UserIdInvalidException)
        } else {
            let file = attachments.pic
            let fileExt = file.mimetype === 'jpg' ? 'jpg' : 'png'
            let fileName = `profile_pic_${request.user_id}.${fileExt}`
            let dpUrl = `http://localhost:3000/${fileName}`
            file.mv(`./public/${fileName}`)
            let affectedRows = await profileQuery.updateDp(request.user_id, dpUrl)
            if (affectedRows == 1) {
                return {
                    dpUploadedSuccessfuly: true,
                    url : dpUrl
                }
            }
            return exception.UserIdInvalidException
        }
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    getProfile,
    editProfile,
    uploadDp,
}