const Joi = require('joi');
const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Fish = mongoose.model('fishes-types', fishSchema);

function validateFish(fish) {
  const schema ={
    name: Joi.string().min(5).max(50).required()

  };

  return Joi.validate(fish,schema)
}


exports.fishSchema = fishSchema;
exports.Fish = Fish;
exports.validate = validateFish;