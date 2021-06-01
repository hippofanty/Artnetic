const { Schema, model } = require('mongoose');

const Chat = new Schema({
  members: [{
    type: String,
  }],
  content: [{
    author: String,
    text: String,
    createdAt: Date,
  }]
});

module.exports = model('Chats', Chat);
