const express = require('express');
const fishes = require('../routes/fishes');
const customers = require('../routes/customers');
const loads = require('../routes/fish-loads');
const purchases = require('../routes/purchases');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const bodyParser = require('body-parser');
const multer = require('multer');
const { User } = require('../models/user');

const upload = multer();
module.exports = function (app) {

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(upload.array());

  app.use(express.json());
  app.use('/api/fishes-types', fishes);
  app.use('/api/customers', customers);
  app.use('/api/fish-loads', loads);
  app.use('/api/purchases', purchases);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  app.get('/home', async (req, res) => {
    let users = await User.find().sort('username');
    if (!users) throw Error("access denied");
   
  //  res.send(users);
  res.render('users.ejs',{users:users});

  });
  app.get('/login', async (req, res) => {
    let users = await User.find().sort('username');
    if (!users) throw Error("access denied");
   
  //  res.send(users);
  res.render('users.ejs',{users:users});

  });
  //users end points
  app.get('/users/adduser', function (req, res) {
    res.render('add-user');
  });
   app.get('/users/edituser/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

 
    res.render('edit-user', {
      id: req.params.id,
      username: user.username,
      email: user.email,
      password: user.password

    });
  });

  app.get('/users/updateuser/:id', async (req, res) => {
    console.log("hiiiiiiii");
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findByIdAndUpdate(req.params.id, { username: req.body.username, email: req.body.email, password: req.body.password }, {
      new: true
    });
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.render('sucesss');
  
  });
  app.get('/users/deleteuser/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.render('sucesss');
  
  });
  app.use(error);
}