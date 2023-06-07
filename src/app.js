const express = require('express');
const app = express();
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

module.exports = app;
