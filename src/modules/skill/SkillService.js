const skillQuery = require('./SkillQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')

async function addUserSkill(request) {
    try {
        let details  = []
        console.log('request',request)
        for(let skill of request.skills){
            details.push([request.user_id, skill.domain , skill.skill , skill.rating ])
        }
        console.log('details',details)
        let affectedRows = await skillQuery.insertUserSkills(details)
        console.log('affectedRows',affectedRows)
        if (affectedRows > 0) {
            return {skillsUpdatedSuccessful:true}
            }
            return {skillsUpdatedSuccessful:false}
        }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function deleteUserSkill(request) {
    try {
        let details  = []
        for(let skill of request.skills){
            details.push([request.user_id, skill.domain , skill.skill])
        }
        let affectedRows = await skillQuery.deleteUserSkills(details)
        if (affectedRows > 0) {
            return {skillsUpdatedSuccessful:true}
            }
            return {skillsUpdatedSuccessful:false}
        }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

async function alterUserSkill(request) {
    try {
        let queries  = []
        for(let skill of request.skills){
            var query = `UPDATE SKILL_MATRIX.user_skills set rating = ${skill.rating} WHERE user_id = ${request.user_id} and skill = '${skill.skill}'`
            queries.push(query)
        }
        let affectedRows = await skillQuery.alterUserSkills(queries.join(';'))
        if (affectedRows > 0) {
            return {skillsUpdatedSuccessful:true}
            }
            return {skillsUpdatedSuccessful:false}
        }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    addUserSkill,
    deleteUserSkill,
    alterUserSkill,
}