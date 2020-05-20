var mysql = require('mysql')
require('dotenv').config()

var connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	charset: 'utf8mb4',
	multipleStatements: true,
})

connection.connect(function (err) {
	if (err) {
		console.log(1)
		throw err
	}
})

module.exports = connection
