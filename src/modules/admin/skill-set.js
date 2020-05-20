const query = require('../../repository/query')
const exception = require('../../utility/CustomException')

async function addSkill(request) {
	try {
		let details = []
		for (let skill of request.skills) {
			details.push([skill.domain, skill.skill])
		}
		await query.addSkills(details)
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteSkill(request) {
	try {
		let details = []
		for (let skill of request.skills) {
			details.push([skill.domain, skill.skill])
		}
		let affectedRows = await query.deleteSkills(details)
		if (affectedRows > 0) {
			await query.deleteUserSkillsBySkill(details)
			return { status: true }
		}
		return exception.InvalidSkillIdException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

module.exports = {
	addSkill,
	deleteSkill,
}
