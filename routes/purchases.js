const {Purchase, validate} = require('../models/purchase'); 
const {Load} = require('../models/fish-load'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const purchases = await Purchase.find().sort('-dateOut');
  res.send(purchases);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const load = await Load.findById(req.body.loadId);
  if (!load) return res.status(400).send('Invalid load.');

  if (load.numberInStock === 0) return res.status(400).send('Load not in stock.');

  let purchase = new Purchase({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    load: {
      _id: load._id,
      title: load.title,
      dailyRentalRate: load.dailyRentalRate
    }
  });
  purchase = await purchase.save();

  load.numberInStock--;
  load.save();
  
  res.send(purchase);
});

router.get('/:id', async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);

  if (!purchase) return res.status(404).send('The purchase with the given ID was not found.');

  res.send(purchase);
});

module.exports = router; 