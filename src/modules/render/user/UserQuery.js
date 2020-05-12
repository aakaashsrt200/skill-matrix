

function getSkillByUserId (userId) {
    return new Promise(function (resolve, reject) {
        let query = `SELECT * from user_skill_list where user_id = ?`
        db.query(query, [userId] ,function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            resolve(rows)
        })
    })
}

module.exports = {
    getSkillByUserId,
}