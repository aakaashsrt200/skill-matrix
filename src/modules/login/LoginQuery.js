
function getUserByNameAndType(userName,userType) {
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

module.exports = {
    getUserByNameAndType,
}