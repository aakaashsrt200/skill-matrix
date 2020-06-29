const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function addSkill(request) {
	try {
		let qList = []
		for (let skill of request.skills) {
			var q = `CALL skill_matrix.sp_add_skill('${skill.domain}','${skill.skill}')`
			qList.push(q)
		}
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
		let duplicateItems = []
		for (let skill of request.skills) {
			var q = `CALL skill_matrix.sp_edit_skill(${skill.skill_id},'${skill.domain}','${skill.skill}')`
			let result = await query.runCustomQueryForEditStoreProcedures(q)
			let resultString = JSON.stringify(result)
			result= JSON.parse(resultString)
			if(result[0][0].count !== 0){
				duplicateItems.push(skill)
			}
		}
		return { status: true,
			duplicateEntry : duplicateItems
		}
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
