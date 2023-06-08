const express = require('express');
const app = express();
const db = require('./db/db');
const morgan = require('morgan');
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

if(process.env.NODE_ENV === 'development') {
  const uri = process.env.DEVELOPMENT_DB.replace('<password>', process.env.DEVELOPMENT_DB_PASSWORD)
  db.connect(uri);
  app.use(morgan('dev'));
}
else if (process.env.NODE_ENV === 'production') {
  const uri = process.env.PRODUCTION_DB.replace('<password>', process.env.PRODUCTION_DB_PASSWORD)
  db.connect(uri);
  app.use(morgan('combined'));
}

module.exports = app;
