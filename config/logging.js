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
    handleExceptions: true,

    handleRejections: true,
  }));
  winston.add(new winston.transports.MongoDB({

    db:'mongodb://localhost:27017/Fish-Agency',
      collection :'log',
      level:'info',
     capped:true,
  
 
   }));
}
 