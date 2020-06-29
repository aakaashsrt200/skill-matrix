const exception = require('../../../utility/CustomException')
const query = require('../../../repository/query')

async function getAllDomain(userId) {
	try {
		if (userId) {
			result = await query.getCertificationDomainByUserId(userId)
		} else {
			result = await query.getAllCertificationDomain()
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

async function getCertification(domainRef, userId) {
	try {
		let result
		console.log(domainRef, userId)
		if (userId) {
			result = await query.getCertificationByDomainRefAndUserId(domainRef, userId)
		} else {
			result = await query.getCertificationByDomainRef(domainRef)
			console.log(result)
		}
		let certificationList = []
		if (result.length > 0) {
			for (let certification of result) {
				certificationList.push({
					name: certification.certification,
					id: certification.certification_id,
				})
			}
		}
		return { certification: certificationList }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getDomainAndCertification(userId) {
	try {
		let result
		if (userId) {
			result = await query.getDomainAndCertificationByUserId(userId)
		} else {
			result = await query.getDomainAndCertification()
		}

		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getUserCertification(userId) {
	try {
		let result = await query.getCertificationByUserId(userId)
		let certificationList = []
		for (let certification of result) {
			delete certification.user_id
			certificationList.push(certification)
		}
		return { certifications: certificationList }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function addUserCertification(request) {
	try {
		let qList = []
		for (let certification of request.certifications) {
			if (!certification.certification_id && certification.domain && certification.certification) {
				var insert = `CALL skill_matrix.sp_add_certificates('${certification.domain}','${certification.certification}','USER')`
				await query.runCustomQuery(insert)
				let result = await query.getCertificationIdByDomainAndCertificate(
					certification.domain,
					certification.certification
				)
				certification.certification_id = result.certification_id
			}
			if (certification.certification_id) {
				var insert = `CALL skill_matrix.sp_add_user_certification(${certification.certification_id},${request.user_id},'${certification.description}')`
				qList.push(insert)
			}
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteUserCertification(request) {
	try {
		let details = []
		for (let certifications_id of request.certifications) {
			details.push([request.user_id, certifications_id])
		}
		await query.deleteUserCertifications(details)
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function alterUserCertification(request) {
	try {
		let qList = []
		for (let certification of request.certifications) {
			var q = `UPDATE SKILL_MATRIX.user_certification set description = '${certification.description}' WHERE user_id = ${request.user_id} and certification_id = ${certification.certification_id}`
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
	getDomainAndCertification,
	getCertification,
	getUserCertification,
	addUserCertification,
	deleteUserCertification,
	alterUserCertification,
}
