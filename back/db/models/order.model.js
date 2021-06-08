const { Schema, model } = require('mongoose');

const Order = new Schema({
  vendorCode: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  city: {
    types: String,
  },
  date: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  work: {
    type: Schema.Types.ObjectId,
    ref: 'Works',
  },
  status: {
    type: String,
    default: 'Pending',
  }
});

module.exports = model('Orders', Order);
