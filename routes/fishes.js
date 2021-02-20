const Joi = require('joi');
const auth =require ('../middleware/auth');
const isadmin =require ('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
  
const {Fish, validate} = require('../models/fish-types'); 


router.get('/', async (req, res) => {
  const fishs = await Fish.find().sort('name');
  res.send(fishs);
});

router.post('/',async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let fish = new Fish({ name: req.body.name });
  fish = await fish.save();
  
  res.send(fish);
});

router.put('/:id',[auth,validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const fish = await Fish.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!fish) return res.status(404).send('The fish with the given ID was not found.');
  
  res.send(fish);
});

router.delete('/:id', [auth,isadmin,validateObjectId],async (req, res) => {
  const fish = await Fish.findByIdAndRemove(req.params.id);

  if (!fish) return res.status(404).send('The fish with the given ID was not found.');

  res.send(fish);
});

router.get('/:id',validateObjectId, async (req, res) => {
  const fish = await Fish.findById(req.params.id);

  if (!fish) return res.status(404).send('The fish with the given ID was not found.');

  res.send(fish);
});

module.exports = router; 