const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-header');
    if (!token) return res.status(401).send('Access denied. no token was provided');

    try {
        const decoded = jwt.verify(token, config.get('app.jwtPrivateKey'));
        req.user = decoded;
        next();
    }



    catch (ex) {
        console.log(config.get('app.jwtPrivateKey'));
        res.status(400).send('invalid token ');

    }
}
//stuff
module.exports=auth;