const connection = require('../../utility/GetDbConnection')

function getUserByUserId(userId) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from profile_service_details where user_id = ?`
        connection.query(query, [userId], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows[0])
        })
    })
}
 
function saveUserDetails(details) {
    return new Promise(function (resolve, reject) {
        var query = `UPDATE SKILL_MATRIX.user_details set bio_description = ?, first_name = ?, last_name = ?, phone_number = ?, practice = ?, coe = ?, designation_role = ?, profile_link = ?     WHERE user_id =?`        
        connection.query(query, [details.bio_description,details.first_name,details.last_name,details.phone_number,details.practice,details.coe,details.designation_role,details.profile_link,details.user_id], function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result.affectedRows)
        })
    })
}

module.exports = {
    getUserByUserId,
    saveUserDetails
}