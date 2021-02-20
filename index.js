const winston = require('winston');
const express = require('express');
const path = require('path');
var swig = require('swig');
var swig = require('ejs');

const app = express();

require('./config/logging')();
require('./config/routes')(app);
require('./config/db-config')();
require('./config/config')();
require('./config/validation')();

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));
app.engine('html', swig.renderFile);
app.use('/', function (req, res) {
  res.render("login.html");
});

// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "Homepage",
//     people: people.profiles
//   });
// });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => winston.warn(`Listening on port ${port}...`));
console.log("jwtPrivateKey--------------------" + config.get('app.jwtPrivateKey'));
module.exports = server;