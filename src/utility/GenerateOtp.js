function rand(min, max) {
    var random = Math.random()
    return Math.floor(random * (max - min) + min)
}

function generate() {
    var password = rand(0, 5000) + rand(0, 5000)
    return password
}

module.exports = {
    generate,
}

