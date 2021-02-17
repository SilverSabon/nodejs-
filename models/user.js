const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const jwt = require('jsonwebtoken');
const config = require('config');
const PasswordComplexity = require("joi-password-complexity").default;

const Userschema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,


    },
    isAdmin: {type: Boolean,default:false}

});


Userschema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('app.jwtPrivateKey'));
    return token;
}

Userschema.methods.generateAuthTokena = function () {

    const token = jwt.sign({ _id: this._id }, config.get('app.jwtPrivateKey', { expiresIn: 1800 }));
    console.log('ttttttttoken -----------' + token);
    //user.tokens = user.tokens.concat({token})
    //await user.save()
    return token;
}
const User = mongoose.model('User', Userschema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).email().required(),

        password: PasswordComplexity()



    });
    //passwordComplexity().validate(password);

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
 
