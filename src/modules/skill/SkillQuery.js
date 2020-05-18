
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
function alterUserSkills(query) {
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result[0].affectedRows)
        })
    })
}

module.exports = {
    insertUserSkills,
    deleteUserSkills,
    alterUserSkills,
}