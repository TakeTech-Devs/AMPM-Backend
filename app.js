const express = require('express');
const app = express();
const dotenv = require('dotenv');
const  errorMiddleware = require("./middleware/error");
const  cookieParser = require('cookie-parser');
const cors = require('cors');


dotenv.config({path:"config/config.env"});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}));


app.use(express.json());
app.use(cookieParser())

// Import Route
const consumer = require('./routes/consumerRoutes');
const reseller = require('./routes/resellerRoutes');
const admin = require('./routes/adminRoutes');
const all = require('./routes/allGetRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');


// Config api
app.use('/api/v1/consumer', consumer);
app.use('/api/v1/reseller', reseller);
app.use('/api/v1/admin', admin);
app.use('/api/v1', all);
app.use('/api/v1/user', user);
app.use('/api/v1', order);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;