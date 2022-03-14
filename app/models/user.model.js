const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    avatar: {
      type: String,
      default: ""
    },
    avatarColor: String,
  },  { timestamps: true, toObject: { virtuals: true, }, toJSON: { virtuals: true } })
);

module.exports = User;