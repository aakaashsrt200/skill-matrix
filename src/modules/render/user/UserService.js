const userQuery = require('./UserQuery')
const exception = require('../../../utility/CustomException')

async function getUserSkill(userId) {
    try {
        let result = await userQuery.getSkillByUserId(userId)
        let skillList = []
        for (let skill of result) {
            delete skill.user_id
            skillList.push(skill)
        }
        return { skill: skillList }
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    getUserSkill,
}