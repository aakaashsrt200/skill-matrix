
function saveSkill(details) {
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

function deleteUserSkills(details) {
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


module.exports = {
    saveSkill,
    deleteSkills,
    deleteUserSkills,
  }