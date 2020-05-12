const domainQuery = require('./SkillQuery')
const exception = require('../../../utility/CustomException')

async function getSkill(domainRef) {
    try {
        let result = await domainQuery.getSkillByDomainRef(domainRef)
        let skillList = []
        for (let skill of result) {
            skillList.push({ name: skill.skill,
                id : skill.skill_id })
        }
        return { skill: skillList }
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    getSkill,
}