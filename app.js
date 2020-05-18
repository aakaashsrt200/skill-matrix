const cors = require('cors')
const express = require('express')
const app = express();
const routes = require('./src/routes.js')
const connection = require('./src/utility/GetDbConnection')
require('dotenv').config()

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
global.db = connection
app.use('/login', routes.login)
app.use('/admin', routes.admin)
app.use('/password', routes.password)
app.use('/profile', routes.profile)
app.use('/get', routes.render)
app.use('/skill', routes.skill)
app.use(express.static('public'))

app.listen(process.env.APPLICATION_PORT, () =>
  console.log(`Skill-matrix app listening on port ${process.env.APPLICATION_PORT}!`),
);