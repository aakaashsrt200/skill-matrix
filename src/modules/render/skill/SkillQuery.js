

function getAllDomain () {
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

function getSkillByDomainRef (domainRef) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from SKILL_MATRIX.skills where domain = ?`
        db.query(query, [domainRef] ,function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows)
        })
    })
}

module.exports = {
    getAllDomain,
    getSkillByDomainRef
}