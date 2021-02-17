const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rental');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
module.exports = function(app) {

  app.use(bodyParser.json()); 

  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(upload.array());
  
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
 ; 
  
  app.use(error);
}