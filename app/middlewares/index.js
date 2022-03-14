const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const store = require('./multer');

module.exports = {
  authJwt,
  verifySignUp,
  store
};