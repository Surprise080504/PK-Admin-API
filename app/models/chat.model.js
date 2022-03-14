const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    chatId: String,
    sender: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    message: String,
},  { timestamps: true, toObject: { virtuals: true, }, toJSON: { virtuals: true } })
);

module.exports = Chat;