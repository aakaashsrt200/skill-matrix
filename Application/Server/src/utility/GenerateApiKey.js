const api = require('./ApiKeyValidator')
async function generateApiKey(token) {
	if (token) {
		let parsedToken = token.slice(7)
		let key = new Promise(function (resolve, reject) {
			let query = `select * from skill_matrix.auth_token where auth_token = '${parsedToken}';`
			db.query(query, function (err, rows, fields) {
				if (err) {
					resolve(null)
				} else if (rows.length === 1) {
					resolve(api.generateKey())
				} else {
					resolve(null)
				}
			})
		})
		return key
	}
}

module.exports = {
	generateApiKey,
}
