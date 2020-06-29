const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function addProjects(request) {
	try {
		let qList = []
		for (let project of request.projects) {
			var q = `CALL skill_matrix.sp_add_project('${project}')`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteProjects(request) {
	try {
		let details = []
		for (let projectId of request.projects) {
			details.push([projectId])
		}
		let affectedRows = await query.deleteProjects(details)
		console.log(affectedRows)
		await query.deleteUserProjectsByProject(details)
		return { status: true }
		return exception.InvalidSkillIdException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getAllProjects() {
	try {
		let result = await query.getProjects()
		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editProjects(request) {
	try {
		let duplicateItems = []
		for (let project of request.projects) {
			var q = `CALL skill_matrix.sp_edit_project(${project.project_id},'${project.project}')`
			let result = await query.runCustomQueryForEditStoreProcedures(q)
			let resultString = JSON.stringify(result)
			result= JSON.parse(resultString)
			console.log(result)
			if(result[0][0].count !== 0){
				duplicateItems.push(project)
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
	addProjects,
	deleteProjects,
	getAllProjects,
	editProjects,
}
