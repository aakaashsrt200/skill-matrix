const exception = require('../../../utility/CustomException')
const query = require('../../../repository/query')

async function getAllDomain(userId) {
	try {
		if (userId) {
			result = await query.getDomainByUserId(userId)
		} else {
			result = await query.getAllDomain()
		}
		let domainList = []
		for (let domain of result) {
			domainList.push({ name: domain.domain })
		}
		return { domain: domainList }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getSkill(domainRef, userId) {
	try {
		let result
		if (userId) {
			result = await query.getSkillByDomainRefAndUserId(domainRef, userId)
		} else {
			result = await query.getSkillByDomainRef(domainRef)
			console.log(result)
		}
		let skillList = []
		if (result.length > 0) {
			for (let skill of result) {
				skillList.push({
					name: skill.skill,
					id: skill.skill_id,
				})
			}
		}
		return { skill: skillList }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getDomainAndSkill(userId) {
	try {
		let result
		if (userId) {
			result = await query.getDomainAndSkillByUserId(userId)
		} else {
			result = await query.getDomainAndSkill()
		}

		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getUserSkill(userId) {
	try {
		let result = await query.getSkillByUserId(userId)
		let skillList = []
		for (let skill of result) {
			delete skill.user_id
			skillList.push(skill)
		}
		return { skills: skillList }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function addUserSkill(request) {
	try {
		let qList = []
		for (let skill of request.skills) {
			var q = `CALL skill_matrix.sp_add_user_skill(${skill.skill_id},${request.user_id},${skill.rating})`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteUserSkill(request) {
	try {
		let details = []
		for (let skill_id of request.skills) {
			details.push([request.user_id, skill_id])
		}
		await query.deleteUserSkills(details)
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function alterUserSkill(request) {
	try {
		let qList = []
		for (let skill of request.skills) {
			var q = `UPDATE SKILL_MATRIX.user_skills set rating = ${skill.rating} WHERE user_id = ${request.user_id} and skill_id = '${skill.skill_id}'`
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
	getAllDomain,
	getDomainAndSkill,
	getSkill,
	getUserSkill,
	addUserSkill,
	deleteUserSkill,
	alterUserSkill,
}
