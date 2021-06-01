const { Schema, model } = require('mongoose');

const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
});

module.exports = model('Categories', Category);
