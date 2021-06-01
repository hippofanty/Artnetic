const { Schema, model } = require('mongoose');

const Work = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
});

module.exports = model('Works', Work);
