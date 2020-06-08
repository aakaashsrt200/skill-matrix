const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function addCertification(request) {
	try {
		let qList = []
		for (let certification of request.certifications) {
			var q = `CALL skill_matrix.sp_add_certificates('${certification.domain}','${certification.certification}','ADMIN')`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteCertification(request) {
	try {
		let details = []
		for (let certificationId of request.certifications) {
			details.push([certificationId])
		}
		let affectedRows = await query.deleteCertifications(details)
		if (affectedRows > 0) {
			await query.deleteUserCertificationsByCertificate(details)
			return { status: true }
		}
		return exception.InvalidCertificationIdException
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getDomainAndCertification() {
	try {
		let result = await query.getDomainAndCertificate()
		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editCertification(request) {
	try {
		let qList = []
		for (let certification of request.certifications) {
			var q = `UPDATE SKILL_MATRIX.certificates set certification = '${certification.certification}', domain = '${certification.domain}' WHERE certification_id = ${certification.certification_id}`
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
	addCertification,
	deleteCertification,
	getDomainAndCertification,
	editCertification,
}
