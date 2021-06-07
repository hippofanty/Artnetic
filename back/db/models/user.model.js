const { Schema, model } = require('mongoose');

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Guest',
  },
  favourites: [
    {
      // type: String,
    type: Schema.Types.ObjectId,
    ref: 'Works',
  }
]
});

module.exports = model('Users', User);
