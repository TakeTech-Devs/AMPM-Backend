const express = require('express');
const app = express();
const dotenv = require('dotenv');
const  errorMiddleware = require("./middleware/error");
const  cookieParser = require('cookie-parser');


dotenv.config({path:"config/config.env"});


app.use(express.json());
app.use(cookieParser())

// Import Route
const consumer = require('./routes/consumerRoutes');
const reseller = require('./routes/resellerRoutes');
const admin = require('./routes/adminRoutes');
const all = require('./routes/allGetRoutes');


// Config api
app.use('/api/v1/consumer', consumer);
app.use('/api/v1/reseller', reseller);
app.use('/api/v1/admin', admin);
app.use('/api/v1', all);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;