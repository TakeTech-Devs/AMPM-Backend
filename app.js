const express = require('express');
const app = express();
const dotenv = require('dotenv');
const  errorMiddleware = require("./middleware/error");
const  cookieParser = require('cookie-parser');
const cors = require('cors');


// dotenv.config({path:"config/config.env"});

// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials:true
// }));

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'https://ampmenergy.com.au','https://www.admin.ampmenergy.com.au','https://admin.ampmenergy.com.au', 'https://ampmnet.netlify.app', 'https://ampmadmin.netlify.app'];


const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));



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
