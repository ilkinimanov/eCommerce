const express = require('express');
const app = express();
const db = require('./db/db');
const dotenv = require('dotenv');
const args = process.argv.slice(2);

dotenv.config('../.env');

if(args.includes('--development')) {
  process.env.NODE_ENV = 'development';
}
else if(args.includes('--production')) {
  process.env.NODE_ENV = 'production';
}
else {
  console.log('Your NODE_ENV is not defined');
  process.exit();
}

if (process.env.NODE_ENV === 'development') {
  const uri = process.env.DEVELOPMENT_DB.replace('<password>', process.env.DB_PASSWORD);
  db.connect(uri);
}
else if (process.env.NODE_ENV === 'production') {
  const uri = process.env.PRODUCTION_DB.replace('<password>', process.env.DB_PASSWORD);
  db.connect(uri);
}

module.exports = app;
