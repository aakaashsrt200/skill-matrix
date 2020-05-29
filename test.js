function getAllCertificationDomain() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_certification_domain_list`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getCertificationDomainByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT DISTINCT A.domain FROM SKILL_MATRIX.certificates A LEFT JOIN (SELECT * FROM SKILL_MATRIX.user_certification WHERE USER_ID = ${userId}) B ON A.certification_id = B.SKILL_ID WHERE B.certification_id IS NULL;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getCertificationDomainAndSkillByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT A.domain, A.certification, A.certification_id FROM SKILL_MATRIX.certificates A LEFT JOIN (SELECT * FROM SKILL_MATRIX.user_certification WHERE USER_ID = ${userId}) BON A.certification_id = B.certification_id WHERE B.certification_id IS NULL;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getDomainAndCertification() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * FROM SKILL_MATRIX.certificates;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getCertificationByDomainRefAndUserId(domainRef, userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT A.certification, A.certification_id FROM SKILL_MATRIX.certificates A LEFT JOIN (SELECT * FROM SKILL_MATRIX.user_certification WHERE USER_ID = ${userId}) B ON A.certification_id = B.certification_id WHERE B.certification_id IS NULL AND A.DOMAIN='${domainRef}';`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getCertificationByDomainRef(domainRef) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT certification_id, certification FROM SKILL_MATRIX.certificates where domain = '${domainRef}';`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getCertificationByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_user_certifications_transaction where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function insertUserCertifications(details) {
	return new Promise(function (resolve, reject) {
		let query = `INSERT INTO SKILL_MATRIX.user_certification (user_id, certification_id, description) VALUES ?;`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteUserSkills(details) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.user_certification WHERE (user_id,certification_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteUserSkillsBySkill(details) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.user_certification WHERE (certification_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteUserSkillsByUserIdAndSkill(details, userId) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.user_certification WHERE user_id =? and (certification_id) IN (?);`
		db.query(query, [userId, details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}
