const connection = require('../../utility/GetDbConnection')

function saveUserDetails(details) {
    return new Promise(function (resolve, reject) {
        let query = `INSERT INTO SKILL_MATRIX.user_details (username,password,email_id,email_verified,created_by,user_type) VALUES ?;`
        let params = [[details.username, details.password, details.email_id, details.email_verified, details.created_by, details.user_type]]
        connection.query(query, [params], function (err, result) {
            if (err) return reject(err);
            resolve(result.affectedRows)
        });
    })
}

function getUserByName(userName) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from SKILL_MATRIX.user_details where username = ?`
        connection.query(query, [userName], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows)
        })
    })
}

module.exports = {
    saveUserDetails,
    getUserByName
}