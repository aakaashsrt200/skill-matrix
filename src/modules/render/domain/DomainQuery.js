

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


function getAll(userId) {
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

module.exports = {
    getAllDomain,
    getAll,
}