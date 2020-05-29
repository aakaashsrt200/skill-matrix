const query = require('../../repository/query')
const exception = require('../../utility/CustomException')
require('dotenv').config()

async function getProfile(userId) {
	try {
		console.log(userId)
		if (userId) {
			console.log(1)
			let response = await query.getProfileByUserIdForAdmin(userId)
			return response ? response : exception.UserIdInvalidException
		} else {
			console.log(2)
			let response = await query.getAllProfileForAdmin()
			return { users: response }
		}
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editProfile(request) {
	try {
		let qList = []
		for (let user of request.users) {
			var q = `UPDATE SKILL_MATRIX.user_details set user_type = '${user.user_type}' WHERE user_id =${user.user_id}`
			qList.push(q)
		}
		let affectedRows = await query.runCustomQuery(qList.join(';'))
		if (affectedRows > 0) {
			return { status: true }
		}
		return exception.UserIdInvalidException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteUserProfile(request) {
	try {
		let details = []
		for (let userId of request.users) {
			details.push([userId])
		}
		await query.deleteUser(details)
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

module.exports = {
	getProfile,
	editProfile,
	deleteUserProfile,
}
