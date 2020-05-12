
function saveNewPassword(password, user_id) {
    return new Promise(function (resolve, reject) {
        var query = `UPDATE SKILL_MATRIX.user_details set password = ? WHERE user_id =?`
        db.query(query, [password, user_id], function (err, result) {
            if (err) return reject(err)
            resolve(result.affectedRows)
        })
    })
}

function setEmailVerifiedStatus(user_id) {
    return new Promise(function (resolve, reject) {
        var query = `UPDATE SKILL_MATRIX.user_details set email_verified = ? WHERE user_id =?`
        db.query(query, [true, user_id], function (err, result) {
            if (err) return reject(err)
            resolve(result.affectedRows)
        })
    })
}

function getUserByUserId(userId) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from login_service_details where user_id = ?`
        db.query(query, [userId], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows[0])
        })
    })
}

function getUserByUserName(userName) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from login_service_details where username = ?`
        db.query(query, [userName], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows[0])
        })
    })
}

function saveOtp(user_id, otp) {
    return new Promise(function (resolve, reject) {
        var query = `UPDATE SKILL_MATRIX.user_details set otp = ? WHERE user_id =?`
        db.query(query, [otp, user_id], function (err, result) {
            if (err) return reject(err)
            resolve(result.affectedRows)
        })
    })
}

function getUserByUserIdAndOtp(userId,otp) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from SKILL_MATRIX.user_details where user_id = ? and otp =?`
        db.query(query, [userId, otp], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows[0])
        })
    })
}

module.exports = {
    saveNewPassword,
    setEmailVerifiedStatus,
    getUserByUserId,
    getUserByUserName,
    saveOtp,
    getUserByUserIdAndOtp,
}