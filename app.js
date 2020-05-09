const cors = require('cors')
const express = require('express')
const app = express();
const routes = require('./src/routes.js')
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', routes.login);
app.use('/register', routes.registration);
app.use('/password', routes.password);

app.listen(process.env.APPLICATION_PORT, () =>
  console.log(`Example app listening on port ${process.env.APPLICATION_PORT}!`),
);