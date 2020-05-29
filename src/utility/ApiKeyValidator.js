function generateKey() {
	let ISTTime = new Date(new Date().getTime() + (330 + new Date().getTimezoneOffset()) * 60000 + 40000) //40000 = 40 Seconds
	let ISTDateTime =
		ISTTime.getMonth() +
		1 +
		'-' +
		ISTTime.getDate() +
		'-' +
		(ISTTime.getYear() - 100) +
		' ' +
		ISTTime.getHours() +
		':' +
		ISTTime.getMinutes() +
		':' +
		ISTTime.getSeconds()
	let passCode = 'MyCeRvElLoCaReS' //Passcode
	let key = passCode + '@' + ISTDateTime //Seperator is @
	let encodedKey = ''
	for (let i = 0; i < key.length; i++) {
		let random = Math.round(Math.random() * 8 + 1)
		encodedKey += random + (key.charCodeAt(i) ^ random).toString(16)
	}
	return encodedKey
}

async function validateKey(key) {
	let res = ''
	for (let i = 0; i < key.length; i += 3) {
		let sub = key.substring(i + 1, i + 3)
		res += String.fromCharCode(parseInt(sub, 16) ^ parseInt(key[i]))
	}
	let keys = res.split('@')
	let isValid =
		'MyCeRvElLoCaReS' === keys[0] &&
		new Date(new Date().getTime() + (330 + new Date().getTimezoneOffset()) * 60000) < Date.parse(keys[1])
	return isValid
}

module.exports = {
	validateKey,
	generateKey,
}
