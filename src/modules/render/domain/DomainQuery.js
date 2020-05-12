

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

module.exports = {
    getAllDomain,
}