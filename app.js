const cors = require('cors')
const express = require('express')
const app = express();
const routes = require('./src/routes.js')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/login', routes.login);
app.use('/register', routes.registration);

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);