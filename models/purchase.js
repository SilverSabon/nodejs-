const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');
Joi.objectId = require('joi-objectid')(Joi);

const Purchaseschema =  new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  load: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date
  },
  purchaseFee: { 
    type: Number, 
    min: 0
  }
});



Purchaseschema.methods.return = function() {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.load.dailyRentalRate;
}
const Purchase = mongoose.model('Purchase', Purchaseschema);


function validatePurchase(purchase) {
  const schema = {
    customerId: Joi.objectId().required(),
    loadId: Joi.objectId().required()
  

};
return Joi.validate(purchase, schema,{ allowUnknown: true });}


exports.Purchase = Purchase; 
exports.validate = validatePurchase;