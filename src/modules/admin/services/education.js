const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function addEducation(request) {
	try {
		let qList = []
		for (let education of request.education) {
			var q = `CALL skill_matrix.sp_add_education('${education.degree}','${education.stream}')`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteEducation(request) {
	try {
		let details = []
		for (let education_id of request.education) {
			details.push([education_id])
		}
		let affectedRows = await query.deleteEducation(details)
		if (affectedRows > 0) {
			await query.deleteUserEducation(details)
		}
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getEducation() {
	try {
		let result = await query.getEducation()
		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editEducation(request) {
	try {
		let qList = []
		for (let education of request.education) {
			var q = `UPDATE SKILL_MATRIX.education set degree = '${education.degree}', stream = '${education.stream}' WHERE education_id = ${education.education_id}`
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
	addEducation,
	deleteEducation,
	getEducation,
	editEducation,
}
