const UserNameInvalidException = require('./UserNameInvalidException')
const PasswordInvalidException = require('./PasswordInvalidException')
const UserNameAlreadyExistException = require('./UserNameAlreadyExistException')
const AttachmentsNotFoundException = require('./AttachmentsNotFoundException')
const OtpInvalidException = require('./OtpInvalidException')
const UserIdInvalidException = require('./UserIdInvalidException')
const InternalServerException = require('./InternalServerException')
const InvalidSkillIdException = require('./InvalidSkillIdException')
const ApiKeyInvalidException = require('./ApiKeyInvalidException')
const InvalidCertificationIdException = require('./InvalidCertificationIdException')
module.exports = {
	UserNameInvalidException: new UserNameInvalidException(),
	PasswordInvalidException: new PasswordInvalidException(),
	UserNameAlreadyExistException: new UserNameAlreadyExistException(),
	AttachmentsNotFoundException: new AttachmentsNotFoundException(),
	OtpInvalidException: new OtpInvalidException(),
	UserIdInvalidException: new UserIdInvalidException(),
	InternalServerException: new InternalServerException(),
	InvalidSkillIdException: new InvalidSkillIdException(),
	ApiKeyInvalidException: new ApiKeyInvalidException(),
	InvalidCertificationIdException: new InvalidCertificationIdException(),
}
