const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex :true})
  .then(() => winston.warn(`Connected to ${db}.....`));
}

 
 
   