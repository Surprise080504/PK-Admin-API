require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  URL: process.env.DB_URL,
};
