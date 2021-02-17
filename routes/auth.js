const Joi = require('joi');
const mongoose = require('mongoose');
const _ =require('lodash');
const bcrypt=require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
config = require ('config');
const {User} = require('../models/user'); 

 

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email} );

  //if (user) return res.status(400).send('this  user is already  found.');
  if (!user) return res.status(400).send('email or password is incorrect.');

 const validpassword = await bcrypt.compare(req.body.password,user.password)
 if (!validpassword) return res.status(400).send('email or password is incorrect.');




  // const token=  user.generateAuthToken1(); 

 
 const token = user.generateAuthToken();
        
         
         

//_.pick('email','username');
 res.send(token);
});
function validate(req) {

    const schema = Joi.object({
        username: Joi.string().min(5).max(255).required(),


        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).email().required()



    });
    return schema.validate(req)

}
module.exports = router; 