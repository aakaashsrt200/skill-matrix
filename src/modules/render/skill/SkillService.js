const domainQuery = require('./SkillQuery')
const exception = require('../../../utility/CustomException')

async function getSkill(domainRef,userId) {
    try {
        let result = await domainQuery.getSkillByDomainRef(domainRef,userId)
        console.log('result',result)
        let skillList = []
        for (let skill of result) {
            skillList.push({ name: skill.SKILL,
                id : skill.SKILL_ID })
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