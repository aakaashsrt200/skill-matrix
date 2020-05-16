
function getUserByUserId(userId) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from profile_service_details where user_id = ?`
        db.query(query, [userId], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows[0])
        })
    })
}
 
function saveUserDetails(details) {
    return new Promise(function (resolve, reject) {
        console.log(details)
        var query = `UPDATE SKILL_MATRIX.user_details set bio_description = ?, first_name = ?, last_name = ?, phone_number = ?, practice = ?, coe = ?, designation_role = ?, profile_link = ?, dp_url = ?  WHERE user_id =?`        
        db.query(query, [details.bio_description,details.first_name,details.last_name,details.phone_number,details.practice,details.coe,details.designation_role,details.profile_link,details.dp_url,details.user_id], function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result.affectedRows)
        })
    })
}

function updateDp(user_id,dpUrl) {
    return new Promise(function (resolve, reject) {
        var query = `UPDATE SKILL_MATRIX.user_details set dp_url = ? WHERE user_id =?`        
        db.query(query, [dpUrl,user_id], function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result.affectedRows)
        })
    })
}

module.exports = {
    getUserByUserId,
    saveUserDetails,
    updateDp
}