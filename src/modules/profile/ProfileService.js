const profileQuery = require('./ProfileQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')
require('dotenv').config()

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

async function editProfile(request, attachments) {
    try {
        let dpUrl = await saveProfilePictureAndGetURL(attachments, request.user_id)
        request.dp_url = dpUrl ? dpUrl : request.profile_picture_url
        //request.dp_url = dpUrl
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

async function saveProfilePictureAndGetURL(attachments, userId) {
    if (attachments) {
        let file = attachments.pic
        let fileExt = file.mimetype === 'jpg' ? 'jpg' : 'png'
        let fileName = `profile_pic_${userId}.${fileExt}`
        let dpUrl = `${process.env.APPLICATION_HOST_URL}:${process.env.APPLICATION_PORT}/${fileName}`
        file.mv(`./public/${fileName}`)
        return dpUrl
    }

}

async function uploadDp(request, attachments) {
    try {

        let dpUrl = await saveProfilePictureAndGetURL(attachments, request.user_id)
        if (!dpUrl) {
            return exception.UserIdInvalidException//No attachments
        }
        let affectedRows = await profileQuery.updateDp(request.user_id, dpUrl)
        if (affectedRows == 1) {
            return {
                dpUploadedSuccessfuly: true,
                url: dpUrl
            }
        }
        return exception.UserIdInvalidException

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