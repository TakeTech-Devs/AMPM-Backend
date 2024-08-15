const express = require('express');
const app = express();
const dotenv = require('dotenv');
const  errorMiddleware = require("./middleware/error");


dotenv.config({path:"config/config.env"});


app.use(express.json());

// Import Route
const consumer = require('./routes/consumerRoutes');
const reseller = require('./routes/resellerRoutes');


// Config api
app.use('/api/v1/consumer', consumer);
app.use('/api/v1/reseller', reseller);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;