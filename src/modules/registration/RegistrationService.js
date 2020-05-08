const registrationQuery = require('./RegistrationQuery')
const exception = require('../../utility/CustomException')
const pwd = require('../../utility/PasswordManager')

async function  register(registrationDetails){
    try{
        if(await isUserNameEligibleForRegistration(registrationDetails.username)){
            let details = buildRegistrationDetails(registrationDetails)
            let affectedRows = await registrationQuery.saveUserDetails(details)
            if(affectedRows == 1){
                delete registrationDetails.password;
                registrationDetails.registrationSuccesful = true
                return registrationDetails
            } else{
                return {registrationSuccesful : false}
            }
        } else{
            return exception.UserNameAlreadyExistException
        }  
    }
    catch(e){
        console.error(e)
        return exception.DatabaseException
    }
                 
}

function buildRegistrationDetails(registrationDetails){
    let details = {}
    details.email_id = registrationDetails.email_id || 'unknown@mycerverllo.com'
    details.username = registrationDetails.username || 'Unknown'
    details.password = pwd.encodePassword(registrationDetails.password || 'Password@123')
    details.email_verified = registrationDetails.email_verified || false
    details.created_by = registrationDetails.created_by || null
    details.first_name = registrationDetails.first_name || null
    details.last_name = registrationDetails.last_name || null
    details.phone_number = registrationDetails.phone_number || null
    details.designation_role = registrationDetails.designation_role || null
    details.bio_description = registrationDetails.bio_description || null
    details.profile_link = registrationDetails.profile_link || null
    details.user_type = registrationDetails.user_type || null
    details.coe = registrationDetails.coe || null
    details.practice = registrationDetails.practice || null
    return details
}

async function isUserNameEligibleForRegistration(userName){
    let response = await registrationQuery.getUserByName(userName)
    return (response && response.length ==0) 
}

module.exports = {
    register,
}