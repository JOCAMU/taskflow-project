require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido. Revisa tu archivo .env');
}

module.exports = {
  PORT: process.env.PORT
};