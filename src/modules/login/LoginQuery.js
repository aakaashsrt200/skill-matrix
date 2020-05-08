const connection = require('../../utility/Database/GetConnection')

function getUserByNameAndType(details){
    return new Promise(function(resolve, reject) {
        let query = `SELECT * from login_service_details where username = '${details.username}' and user_type = '${details.user_type}'`
        connection.query(query, function (err, rows, fields) {
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