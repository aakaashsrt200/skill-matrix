var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'SKILL_MATRIX',
    charset: "utf8mb4"
  });

connection.connect(function(err) {
    if (err) {
      console.log(1)
      throw err
    };
});

module.exports = connection;