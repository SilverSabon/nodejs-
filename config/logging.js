const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
   
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'exceptions.log' })
     
  );
  winston.add(new winston.transports.Console)
  winston.add(new winston.transports.File({
    filename: 'logfile.log',

    handleRejections: true,
  }));
 
}
 