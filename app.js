const cors = require('cors')
const express = require('express')
const app = express();
const routes = require('./src/routes.js')
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', routes.login);
app.use('/admin/register', routes.registration);
app.use('/password', routes.password);
app.use('/profile', routes.profile);


app.listen(process.env.APPLICATION_PORT, () =>
  console.log(`Skill-matrix app listening on port ${process.env.APPLICATION_PORT}!`),
);