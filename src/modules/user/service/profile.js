const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')
require('dotenv').config()

async function getProfile(user_id) {
	try {
		let response = await query.getUserProfileByUserId(user_id)
		if (response) {
			if (response.language_list) {
				response.language_list = response.language_list.split(',').map((e) => {
					e = e.split(':')
					return {
						language_id: e[0],
						language: e[1],
					}
				})
			}
			return response
		}
		return exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getProfileForEdit(user_id) {
	try {
		let response = await query.getUserProfileForEditByUserId(user_id)
		if (response) {
			if (response.language_list) {
				response.language_list = response.language_list.split(',').map((e) => {
					e = e.split(':')
					return {
						language_id: e[0],
						language: e[1],
					}
				})
			}
			if (response.lang_list) {
				let language_list = response.lang_list.split(',').map((e) => {
					e = e.split(':')
					return {
						language_id: e[0],
						language: e[1],
					}
				})
			}
			if (response.des_list) {
				let designation_list = response.des_list.split(',').map((e) => {
					e = e.split(':')
					return {
						designation_role_id: e[0],
						designation: e[1],
						role: e[2],
					}
				})
			}
			if (response.coe_list) {
				let coe_list = response.coe_list.split(',').map((e) => {
					e = e.split(':')
					return {
						coe_id: e[0],
						coe: e[1],
						practice: e[2],
					}
				})
			}
			if (response.edu_list) {
				let edu_list = response.edu_list.split(',').map((e) => {
					e = e.split(':')
					return {
						education_id: e[0],
						education_name: e[1],
					}
				})
			}
			delete response.coe_list
			delete response.des_list
			delete response.lang_list
			delete response.edu_list
			let to_populate = {}
			to_populate.language_list = language_list
			to_populate.designation_list = designation_list
			to_populate.coe_list = coe_list
			to_populate.edu_list = edu_list

			let consolidated = {}
			consolidated.profile = response
			consolidated.populate = to_populate
			return consolidated
		}
		return exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editProfile(request, attachments) {
	try {
		let dpUrl = await saveProfilePictureAndGetURL(attachments, request.user_id)
		request.dp_url = dpUrl ? dpUrl : request.profile_picture_url
		let language_list = request.language_list
		delete request.language_list
		let qList = []
		qList.push(`DELETE FROM  SKILL_MATRIX.user_language where user_id = ${request.user_id}`)
		for (let languageId of language_list) {
			var q = `INSERT INTO SKILL_MATRIX.user_language (user_id, language_id) VALUES (${request.user_id},${languageId})`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		let affectedRows = await query.saveUserDetails(request)
		if (affectedRows == 1) {
			let response = await query.getUserProfileByUserId(request.user_id)
			if (response) {
				response.language_list = response.language_list.split(',').map((e) => {
					e = e.split(':')
					return {
						language_id: e[0],
						language: e[1],
					}
				})
				return response
			}
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
	getProfileForEdit,
	editProfile,
	uploadDp,
}
