const domainQuery = require('./DomainQuery')
const exception = require('../../../utility/CustomException')

async function getAllDomain(request) {
    try {
        let result = await domainQuery.getAllDomain()
        console.log(result)
        let domainList = []
        for(let domain of result){
            domainList.push({name:domain.domain})
        }
        return {domain:domainList}
    }
    catch (e) {
        console.error(e)
        return exception.DatabaseException
    }
}

module.exports = {
    getAllDomain,
}