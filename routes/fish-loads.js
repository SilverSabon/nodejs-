const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
 const auth =require('../middleware/auth');
const moment =require('moment');
const {Fish } = require('../models/fish-types'); 

const {Load, validate} = require('../models/fish-load'); 
// async function createLoad(title, fishs) {
//     const loads = new Load({
//         title,
//         fishs
//     });
//     loads.save();
//     console.log(loads);

// }

//createLoad('the croods',new Fish ({'name':'sci-fi'}));



router.get('/', async (req, res) => {
    const load = await Load.find().sort('title');
    res.send(load);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const fish = await Fish.findById(req.body.fishId);
    const load = new Load({ title: req.body.title,fishes:{_id:fish._id,
        name:fish.name},numberInStock:req.body.numberInStock,dailyRentalRate:req.body.dailyRentalRate,    publishDate: moment().toJSON()});
    await load.save();

    res.send(load);
});
// modify these 
router.put('/:id', async (req, res) => {
    const { error } = validateload(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const load = await Loads.findByIdAndUpdate(req.params.id, { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone }, {
        new: true
    });

    if (!load) return res.status(404).send('The load with the given ID was not found.');

    res.send(load);
});

router.delete('/:id', async (req, res) => {
    const load = await Load.findByIdAndRemove(req.params.id);

    if (!load) return res.status(404).send('The load with the given ID was not found.');

    res.send(load);
});

router.get('/:id', async (req, res) => {
    const load = await Load.findById(req.params.id);

    if (!load) return res.status(404).send('The load with the given ID was not found.');

    res.send(load);
});




module.exports = router; 