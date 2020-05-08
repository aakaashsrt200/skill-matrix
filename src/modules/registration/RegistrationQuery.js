const connection = require('../../utility/Database/GetConnection')

    function saveUserDetails(details){
        return new Promise(function(resolve, reject) {
            let query = `INSERT INTO SKILL_MATRIX.user_details (username,password,email_id,email_verified,created_by,first_name,last_name,phone_number,designation_role,bio_description,profile_link,user_type) VALUES ('${details.username}','${details.password}','${details.email_id}',${details.email_verified},'${details.created_by}','${details.first_name}','${details.last_name}','${details.phone_number}','${details.designation_role}','${details.bio_description}','${details.profile_link}','${details.user_type}');`
            connection.query(query, function (err, result) {  
                if (err) return reject(err);  
                console.log("Number of records inserted: " + result.affectedRows); 
                resolve(result.affectedRows) 
                });  
        })
    }

    function getUserByName(userName){
        return new Promise(function(resolve, reject) {
            let query = `SELECT * from SKILL_MATRIX.user_details where username = '${userName}'`
            connection.query(query, function (err, rows, fields) {
                if (err) {
                return reject(err)
            }
            console.log(rows.length)
            resolve(rows)
          })
        })          
    }

module.exports = {
    saveUserDetails,
    getUserByName
}