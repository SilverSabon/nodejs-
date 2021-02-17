
 
const config = require('config');

module.exports = function() {
   if (!config.get('app.jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}

 