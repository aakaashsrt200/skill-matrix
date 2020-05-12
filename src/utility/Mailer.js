const mailer = require('nodemailer')
require('dotenv').config()

function sendMail(to, subject, text, html) {
  var transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      type: 'login',
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD
    }
  })
  var mailContent = {
    from: process.env.EMAIL_ID,
    to: to,
    subject: subject
  }
  if (html) {
    mailContent.html = html
  } else {
    mailContent.text = text
  }
  transporter.sendMail(mailContent)
}

module.exports = { sendMail, }