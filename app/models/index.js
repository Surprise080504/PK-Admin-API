const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.chat = require("./chat.model");
db.friends = require("./friends.model");
db.messages = require("./messages.model");

db.ROLES = ["user", "owner"];

module.exports = db;