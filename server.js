const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

//set dotenv
dotenv.config({ path: './config/config.env' });

//connect mongoDB
connectDB();

//create server level middleware
const app = express();

//request body parser middleware
app.use(express.json());
//use route middleware
app.use('/api/v1/transactions', require('./routes/transactions.js'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//listen to port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('w : server listening ' + PORT.yellow.bold));
