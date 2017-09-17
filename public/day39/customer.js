const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validators = require('mongoose-validators');


const CustomerSchema = new Schema({
  name: {
    type: String
  },

  phone:{
    type: Number
  },

  tableNum: {
    type: Number
  },

  time: {
    type: String
  }

});

const Customer = mongoose.model('customer', CustomerSchema);



module.exports = Customer;
