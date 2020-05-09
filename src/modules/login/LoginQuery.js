const connection = require('../../utility/GetDbConnection')

function getUserByNameAndType(details) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from login_service_details where username = ? and user_type = ?`
        connection.query(query, [details.username, details.user_type], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows[0])
        })
    })
}

module.exports = {
    getUserByNameAndType,
}