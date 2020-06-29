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
		let duplicateItems = []
		for (let education of request.education) {
			var q = `CALL skill_matrix.sp_edit_education(${education.education_id},'${education.degree}','${education.stream}');`
			let result = await query.runCustomQueryForEditStoreProcedures(q)
			let resultString = JSON.stringify(result)
			result= JSON.parse(resultString)
			console.log(result)
			if(result[0][0].count !== 0){
				duplicateItems.push(education)
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
	addEducation,
	deleteEducation,
	getEducation,
	editEducation,
}
