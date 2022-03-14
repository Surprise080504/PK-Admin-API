const db = require("../models");
const Chat = db.chat;

//new chat

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.ownerBoard = (req, res) => {
  res.status(200).send("Owner Content.");
};

