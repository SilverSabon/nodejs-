const Joi = require('joi');
const mongoose = require('mongoose');
const {fishSchema} = require('./fish-types');

const Load = mongoose.model('Fish-Loads', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  fishes: { 
    type: fishSchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateLoad(load) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

const schema = {
  title: Joi.string().min(5).max(50).required(),
  fishId: Joi.objectId().required(),
  numberInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required()


};
return Joi.validate(load, schema, { allowUnknown: true }
)};


exports.Load = Load; 
exports.validate = validateLoad;