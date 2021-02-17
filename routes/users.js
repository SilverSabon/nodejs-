require('express-async-errors');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ =require('lodash');
const bcrypt=require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require ('jsonwebtoken');
const auth = require('../middleware/auth');

const {User, validate} = require('../models/user'); 

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
router.get('/', async (req, res) => {
  let users = await User.find().sort('username');
  if (!users) throw Error("access denied");
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ username: req.body.username} );

  if (user) return res.status(400).send('this  user is already  found.');
  
  user = new User(_.pick(req.body,[,'password','email','username']));
// hashing password
  const salt=await bcrypt.genSalt(10);

  user.password=await bcrypt.hash(user.password,salt);
    await user.save();
//_.pick('email','username');
//const token =jwt.sign({_id:user._id},config.get('app.jwtPrivateKey'));
const token =   user.generateAuthToken();
  //res.header('x-auth-header',token).send(_.pick(user,['username','email','password']));

  //render this shit
  res.render("index",{messages: user});
});

module.exports = router; 