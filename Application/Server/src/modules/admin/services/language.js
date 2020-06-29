const query = require('../../../repository/query')
const exception = require('../../../utility/CustomException')

async function addLanguage(request) {
	try {
		let qList = []
		for (let language_name of request.languages) {
			var q = `CALL skill_matrix.sp_add_language('${language_name}')`
			qList.push(q)
		}
		await query.runCustomQuery(qList.join(';'))
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function deleteLanguage(request) {
	try {
		let details = []
		for (let language_id of request.languages) {
			details.push([language_id])
		}
		let affectedRows = await query.deleteLanguage(details)
		if (affectedRows > 0) {
			await query.deleteUserLanguage(details)
		}
		return { status: true }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function getLanguage() {
	try {
		let result = await query.getLanguage()
		return { list: result }
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

async function editLanguage(request) {
	try {
		let duplicateItems = []
		for (let language of request.languages) {
			var q = `CALL skill_matrix.sp_edit_language(${language.language_id},'${language.language_name}')`
			let result = await query.runCustomQueryForEditStoreProcedures(q)
			let resultString = JSON.stringify(result)
			result= JSON.parse(resultString)
			if(result[0][0].count !== 0){
				duplicateItems.push(language)
			}
		}
		return { status: true,
			duplicateEntry : duplicateItems
		}
	} catch (e) {
		console.error(e)
		return exception.InternalServerException
	}
}

module.exports = {
	addLanguage,
	deleteLanguage,
	getLanguage,
	editLanguage,
}
