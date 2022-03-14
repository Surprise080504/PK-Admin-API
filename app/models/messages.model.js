const mongoose = require("mongoose");

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    friendId: String,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        default: 'text'
    },
    content: String,
},  { timestamps: true, toObject: { virtuals: true, }, toJSON: { virtuals: true } })
);

module.exports = Message;