import express from 'express';
import * as db from './db/db.js';
import productRoutes from './routes/productRoutes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();
const args = process.argv.slice(2);

dotenv.config('../.env');
app.use(express.json())

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

app.use('/product', productRoutes);

export default app;
