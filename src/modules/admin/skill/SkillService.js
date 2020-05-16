const skillQuery = require('./SkillQuery')
const exception = require('../../../utility/CustomException')

async function addSkill(request) {
    try {
        let details = []
        for (let skill of request.skills) {
            details.push([skill.domain, skill.skill])
        }
        let affectedRows = await skillQuery.saveSkill(details)
        if (affectedRows > 0) {
            return { skillsAddedSuccessful: true }
        }
        return { skillsAddedSuccessful: false }
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function deleteSkill(request) {
    try {
        let details = []
        for (let skill of request.skills) {
            details.push([skill.domain, skill.skill])
        }
        let affectedRows = await skillQuery.deleteSkills(details)
        if (affectedRows > 0) {
            let affectedUserSkillRows = await skillQuery.deleteUserSkills(details)
            if (affectedUserSkillRows > 0) {
                return { skillsUpdatedSuccessful: true }
            }
        }
        return { skillsUpdatedSuccessful: false }
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    addSkill,
    deleteSkill,
}