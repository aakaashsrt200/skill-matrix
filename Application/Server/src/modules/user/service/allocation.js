const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function getProjects(userId) {
	try {
		if (userId) {
			result = await query.getProjectByUserId(userId)
		} else {
			result = await query.getAllProject()
		}
		let projectList = []
		for (let project of result) {
			projectList.push({
				project_id: project.project_id,
				project: project.project,
			})
		}
		return { project: projectList }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getUserProjects(userId) {
	try {
		result = await query.getUserProject(userId)
		return { project: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function addProjects(request) {
	try {
		let qList = []
		for (let project of request.projects) {
			var q = `CALL skill_matrix.sp_add_user_project(${project.project_id},${request.user_id},${project.utilization},'${project.end_date}')`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editProjects(request) {
	try {
		let qList = []
		for (let project of request.projects) {
			var q = `UPDATE SKILL_MATRIX.user_project set utilization = ${project.utilization}, end_date = '${project.end_date}' WHERE user_id = ${request.user_id} and project_id = ${project.project_id}`
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
		await query.deleteUserProjectsByProject(details)
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

module.exports = {
	getProjects,
	getUserProjects,
	addProjects,
	editProjects,
	deleteProjects,
}
