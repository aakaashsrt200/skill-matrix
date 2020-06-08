function getUserByNameAndType(userName, userType) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_login_service_details where username = ? and user_type = ?`
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
		var query = `UPDATE SKILL_MATRIX.user_details set bio_description = ?,first_name = ?, last_name = ?, nickname =?, phone_number = ?, coe_id = ?, designation_role_id = ?, education_id = ?, profile_link = ?, dp_url = ?  WHERE user_id =?;`
		db.query(
			query,
			[
				details.bio_description,
				details.first_name,
				details.last_name,
				details.nickname,
				details.phone_number,
				details.coe_id,
				details.designation_role_id,
				details.education_id,
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
		let query = `SELECT * from user_details where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}
function getUserProfileForEditByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from  skill_matrix.vw_profile_service_details a, skill_matrix.vw_lang_desig_coe_edu_concat b where a.user_id = ?;`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			console.log(rows[0])
			resolve(rows[0])
		})
	})
}

function getUserByUserName(userName) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_login_service_details where username = ?`
		db.query(query, [userName], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function getUserByEmailId(emailId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_login_service_details where email_id = ?`
		db.query(query, [emailId], function (err, rows, fields) {
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
		let query = `SELECT * from vw_profile_service_details where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function getAllProfile() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_profile_service_details`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getAllProfileForAdmin() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_profile_service_details_admin`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getProfileByUserIdForAdmin(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_profile_service_details_admin where user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function getAllSkillSetDomain() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from vw_skillset_domain_list`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getSkillSetDomainByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT DISTINCT A.domain FROM SKILL_MATRIX.SKILLS A LEFT JOIN (SELECT * FROM SKILL_MATRIX.USER_SKILLS WHERE USER_ID = ${userId}) B ON A.SKILL_ID = B.SKILL_ID WHERE B.SKILL_ID IS NULL;`
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
		let query = `SELECT A.domain, A.skill, A.skill_id FROM SKILL_MATRIX.SKILLS A LEFT JOIN (SELECT * FROM SKILL_MATRIX.USER_SKILLS WHERE USER_ID = ${userId}) B ON A.SKILL_ID = B.SKILL_ID WHERE B.SKILL_ID IS NULL;`
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
		let query = `SELECT A.skill, A.skill_id FROM SKILL_MATRIX.skills A LEFT JOIN (SELECT * FROM SKILL_MATRIX.USER_SKILLS WHERE USER_ID = ${userId}) B ON A.SKILL_ID = B.SKILL_ID WHERE B.SKILL_ID IS NULL AND A.DOMAIN='${domainRef}';`
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
		let query = `SELECT skill_id, skill FROM SKILL_MATRIX.skills where domain = '${domainRef}';`
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
		let query = `SELECT * from vw_user_skills_transaction where user_id = ?`
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
		let query = `INSERT INTO SKILL_MATRIX.user_skills (user_id, skill_id, rating) VALUES ?;`
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
		let query = `DELETE FROM SKILL_MATRIX.user_skills WHERE (user_id,skill_id) IN (?);`
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
		let query = `DELETE FROM SKILL_MATRIX.user_skills WHERE (skill_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function runCustomQuery(query) {
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
		let query = `CALL skill_matrix.sp_add_skill(?)`
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
		let query = `DELETE FROM SKILL_MATRIX.skills WHERE (skill_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteUser(details) {
	return new Promise(function (resolve, reject) {
		var query = `DELETE FROM SKILL_MATRIX.user_details WHERE (user_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function getProjects() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * FROM SKILL_MATRIX.projects;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function deleteProjects(details) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.projects WHERE (project_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteUserProjectsByProject(details) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.user_project WHERE (project_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function getAllProject() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * FROM SKILL_MATRIX.projects`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getUserProject(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * FROM SKILL_MATRIX.vw_user_projects_transaction WHERE user_id = ?`
		db.query(query, [userId], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getProjectByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT DISTINCT A.project, A.project_id FROM SKILL_MATRIX.projects A LEFT JOIN(SELECT * FROM SKILL_MATRIX.user_project WHERE USER_ID = ${userId}) B ON A.project_id = B.project_id WHERE B.project_id IS NULL;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function insertUserProjects(details) {
	return new Promise(function (resolve, reject) {
		let query = `INSERT INTO SKILL_MATRIX.user_project (user_id, project, utilization, end_date) VALUES ?;`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function deleteCertifications(details) {
	return new Promise(function (resolve, reject) {
		let query = `DELETE FROM SKILL_MATRIX.certificates WHERE (certification_id) IN (?);`
		db.query(query, [details], function (err, result) {
			if (err) {
				return reject(err)
			}
			resolve(result.affectedRows)
		})
	})
}

function getDomainAndCertificate() {
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
		let query = `SELECT DISTINCT A.domain FROM SKILL_MATRIX.certificates A LEFT JOIN (SELECT * FROM SKILL_MATRIX.user_certification WHERE USER_ID = ${userId}) B ON A.certification_id = B.certification_id WHERE B.certification_id IS NULL;`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

function getDomainAndCertificationByUserId(userId) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT A.domain, A.certification, A.certification_id FROM SKILL_MATRIX.certificates A LEFT JOIN (SELECT * FROM SKILL_MATRIX.user_certification WHERE USER_ID = ${userId}) B ON A.certification_id = B.certification_id WHERE B.certification_id IS NULL;`
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

function deleteUserCertifications(details) {
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

function deleteUserCertificationsByCertificate(details) {
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

function getCertificationIdByDomainAndCertificate(domain, certification) {
	return new Promise(function (resolve, reject) {
		let query = `SELECT * from certificates where domain = ? and certification = ?`
		db.query(query, [domain, certification], function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows[0])
		})
	})
}

function getAllAdminMailId() {
	return new Promise(function (resolve, reject) {
		let query = `SELECT email_id from user_details where user_type = 'admin'`
		db.query(query, function (err, rows, fields) {
			if (err) {
				return reject(err)
			}
			resolve(rows)
		})
	})
}

module.exports = {
	getUserByNameAndType,
	saveNewPassword,
	setEmailVerifiedStatus,
	getUserByUserId,
	getUserProfileForEditByUserId,
	getUserByUserName,
	getUserByEmailId,
	saveUserDetails,
	updateDp,
	saveOtp,
	getUserByUserIdAndOtp,
	registerUserDetails,
	getUserProfileByUserId,
	getAllProfile,
	getAllSkillSetDomain,
	getSkillSetDomainByUserId,
	getDomainAndSkill,
	getDomainAndSkillByUserId,
	getSkillByDomainRef,
	getSkillByDomainRefAndUserId,
	getSkillByUserId,
	insertUserSkills,
	deleteUserSkills,
	deleteUserSkillsBySkill,
	runCustomQuery,
	addSkills,
	deleteSkills,
	deleteUser,
	getProjects,
	deleteProjects,
	deleteUserProjectsByProject,
	getAllProject,
	getProjectByUserId,
	insertUserProjects,
	getUserProject,
	deleteCertifications,
	getDomainAndCertificate,
	insertUserCertifications,
	deleteUserCertifications,
	getCertificationByUserId,
	getCertificationByDomainRef,
	getCertificationByDomainRefAndUserId,
	getDomainAndCertification,
	getDomainAndCertificationByUserId,
	getCertificationDomainByUserId,
	getAllCertificationDomain,
	deleteUserCertificationsByCertificate,
	getAllProfileForAdmin,
	getProfileByUserIdForAdmin,
	getCertificationIdByDomainAndCertificate,
	getAllAdminMailId,
}
