

function encodePassword(password) {
    let encodedPassword = ''
    for (let i = 0; i < password.length; i++) {
        let random = (Math.round(Math.random() * 8 + 1))
        encodedPassword += random + (password.charCodeAt(i) ^ random).toString(16) + '-'
    }
    return encodedPassword
}

function validatePassword(password, encodedPassword) {
    encodedPassword = encodedPassword.replace(/-/g, '')
    decodedPassword = ''
    for (let i = 0; i < encodedPassword.length; i += 3) {
        let hex = encodedPassword.substring(i + 1, i + 3)
        decodedPassword += String.fromCharCode(parseInt(hex, 16) ^ parseInt(encodedPassword.charAt(i)))
    }
    return password === decodedPassword ? true : false
}


module.exports = {
    encodePassword,
    validatePassword
}