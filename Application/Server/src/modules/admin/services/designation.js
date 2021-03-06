const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function addDesignationAndRole(request) {
	try {
		let qList = []
		for (let designRole of request.designationAndRoles) {
			var q = `CALL skill_matrix.sp_add_designation_role('${designRole.designation}','${designRole.role}')`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteDesignationAndRole(request) {
	try {
		let details = []
		for (let desigRoleId of request.desigRole) {
			details.push([desigRoleId])
		}
		let affectedRows = await query.deleteDesignationAndRole(details)
		if (affectedRows > 0) {
			await query.deleteUserDesignationAndRole(details)
		}
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getDesignationAndRole() {
	try {
		let result = await query.getDesignationAndRole()
		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editDesignationAndRole(request) {
	try {
		let duplicateItems = []
		for (let desigRole of request.designationAndRoles) {
			var q = `CALL skill_matrix.sp_edit_designation_role(${desigRole.designation_role_id},'${desigRole.designation}','${desigRole.role}')`
			let result = await query.runCustomQueryForEditStoreProcedures(q)
			let resultString = JSON.stringify(result)
			result= JSON.parse(resultString)
			console.log(result)
			if(result[0][0].count !== 0){
				duplicateItems.push(desigRole)
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
	addDesignationAndRole,
	deleteDesignationAndRole,
	getDesignationAndRole,
	editDesignationAndRole,
}
