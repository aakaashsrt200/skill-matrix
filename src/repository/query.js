function getUserByNameAndType(userName, userType) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from login_service_details where username = ? and user_type = ?`
		db.query(query, [userName, userType], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function saveNewPassword(password, user_id) {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE SKILL_MATRIX.user_details set password = ? WHERE user_id =?`
		db.query(query, [password, user_id], function (err, result) {
			if (err) return reject(err)
			resolve(result.affectedRows)
		})
	})
}

function setEmailVerifiedStatus(user_id) {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE SKILL_MATRIX.user_details set email_verified = ? WHERE user_id =?`
		db.query(query, [true, user_id], function (err, result) {
			if (err) return reject(err)
			resolve(result.affectedRows)
		})
	})
}

function saveUserDetails(details) {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE SKILL_MATRIX.user_details set bio_description = ?, first_name = ?, last_name = ?, phone_number = ?, practice = ?, coe = ?, designation_role = ?, profile_link = ?, dp_url = ?  WHERE user_id =?`
		db.query(
			query,
			[
				details.bio_description,
				details.first_name,
				details.last_name,
				details.phone_number,
				details.practice,
				details.coe,
				details.designation_role,
				details.profile_link,
				details.dp_url,
				details.user_id,
			],
			function (err, result) {
				if (err) {
					return reject(err)
				}
				resolve(result.affectedRows)
			}
		)
	})
}

function updateDp(user_id, dpUrl) {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE SKILL_MATRIX.user_details set dp_url = ? WHERE user_id =?`
		db.query(query, [dpUrl, user_id], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function getUserByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from login_service_details where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function getUserByUserName(userName) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from login_service_details where username = ?`
		db.query(query, [userName], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function saveOtp(user_id, otp) {
	return new Promise(function (resolve, reject) {
		var query = `UPDATE SKILL_MATRIX.user_details set otp = ? WHERE user_id =?`
		db.query(query, [otp, user_id], function (err, result) {
			if (err) return reject(err)
			resolve(result.affectedRows)
		})
	})
}

function getUserByUserIdAndOtp(userId, otp) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from SKILL_MATRIX.user_details where user_id = ? and otp =?`
		db.query(query, [userId, otp], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function registerUserDetails(details) {
	return new Promise(function (resolve, reject) {
		let query = `INSERT INTO SKILL_MATRIX.user_details (username,password,email_id,email_verified,created_by,user_type) VALUES ?;`
		let params = [
			[
				details.username,
				details.password,
				details.email_id,
				details.email_verified,
				details.created_by,
				details.user_type,
			],
		]
		db.query(query, [params], function (err, result) {
			if (err) return reject(err)
			resolve(result.affectedRows)
		})
	})
}

function getUserProfileByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from profile_service_details where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function getAllDomain() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from domain_list`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getDomainByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT distinct A.domain FROM SKILL_MATRIX.SKILLS A LEFT JOIN (SELECT * FROM SKILL_MATRIX.USER_SKILLS WHERE USER_ID = ${userId}) B ON A.SKILL = B.SKILL WHERE B.SKILL IS NULL;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getDomainAndSkillByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT A.domain, A.skill, A.skill_id FROM SKILL_MATRIX.SKILLS A LEFT JOIN (SELECT * FROM SKILL_MATRIX.USER_SKILLS WHERE USER_ID = ${userId}) B ON A.SKILL = B.SKILL WHERE B.SKILL IS NULL;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getDomainAndSkill() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * FROM SKILL_MATRIX.SKILLS;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getSkillByDomainRefAndUserId(domainRef, userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT A.skill, A.skill_id FROM SKILL_MATRIX.skills A LEFT JOIN (SELECT * FROM SKILL_MATRIX.USER_SKILLS WHERE USER_ID = ${userId}) B ON A.SKILL = B.SKILL WHERE B.SKILL IS NULL AND A.DOMAIN='${domainRef}';`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getSkillByDomainRef(domainRef) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT skill FROM SKILL_MATRIX.skills where domain = '${domainRef}';`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getSkillByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from user_skill_list where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function insertUserSkills(details) {
	return new Promise(function (resolve, reject) {
		let query = `INSERT INTO SKILL_MATRIX.user_skills (user_id, domain, skill, rating) VALUES ?;`
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
		let query = `DELETE FROM SKILL_MATRIX.user_skills WHERE (user_id, domain, skill) IN (?);`
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
		let query = `DELETE FROM SKILL_MATRIX.user_skills WHERE (domain, skill) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function alterUserSkills(query) {
	return new Promise(function (resolve, reject) {
		db.query(query, function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function addSkills(details) {
	return new Promise(function (resolve, reject) {
		let query = `INSERT INTO SKILL_MATRIX.skills (domain, skill) VALUES ?;`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteSkills(details) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.skills WHERE (domain, skill) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

module.exports = {
	getUserByNameAndType,
	saveNewPassword,
	setEmailVerifiedStatus,
	getUserByUserId,
	getUserByUserName,
	saveUserDetails,
	updateDp,
	saveOtp,
	getUserByUserIdAndOtp,
	registerUserDetails,
	getUserProfileByUserId,
	getAllDomain,
	getDomainByUserId,
	getDomainAndSkill,
	getDomainAndSkillByUserId,
	getSkillByDomainRef,
	getSkillByDomainRefAndUserId,
	getSkillByUserId,
	insertUserSkills,
	deleteUserSkills,
	deleteUserSkillsBySkill,
	alterUserSkills,
	addSkills,
	deleteSkills,
}
