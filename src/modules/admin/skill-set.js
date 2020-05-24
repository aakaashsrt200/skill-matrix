const query = require('../../repository/query')
const exception = require('../../utility/CustomException')

async function addSkill(request) {
	try {
		let qList = []
		for (let skill of request.skills) {
			var q = `CALL skill_matrix.sp_add_skill('${skill.domain}','${skill.skill}')`
			qList.push(q)
		}
		console.log(qList.join(';'))
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteSkill(request) {
	try {
		let details = []
		for (let skillId of request.skills) {
			details.push([skillId])
		}
		let affectedRows = await query.deleteSkills(details)
		console.log(details, affectedRows)
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

async function getDomainAndSkill() {
	try {
		let result = await query.getDomainAndSkill()
		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editSkill(request) {
	try {
		let qList = []
		for (let skill of request.skills) {
			var q = `UPDATE SKILL_MATRIX.skills set skill = '${skill.skill}', domain = '${skill.domain}' WHERE skill_id = ${skill.skill_id}`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

module.exports = {
	addSkill,
	deleteSkill,
	getDomainAndSkill,
	editSkill,
}
