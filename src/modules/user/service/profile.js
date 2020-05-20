const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')
require('dotenv').config()

async function getProfile(user_id) {
	try {
		let response = await query.getUserProfileByUserId(user_id)
		if (response) {
			return response
		}
		return exception.UserNameInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editProfile(request, attachments) {
	try {
		let dpUrl = await saveProfilePictureAndGetURL(attachments, request.user_id)
		request.dp_url = dpUrl ? dpUrl : request.profile_picture_url
		let affectedRows = await query.saveUserDetails(request)
		if (affectedRows == 1) {
			let response = await query.getUserProfileByUserId(request.user_id)
			response.status = true
			return response
		}
		return exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
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
			return exception.UserIdInvalidException //No attachments
		}
		let affectedRows = await query.updateDp(request.user_id, dpUrl)
		if (affectedRows == 1) {
			return {
				status: true,
				url: dpUrl,
			}
		}
		return exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

module.exports = {
	getProfile,
	editProfile,
	uploadDp,
}
