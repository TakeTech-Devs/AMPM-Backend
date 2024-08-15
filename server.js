const app = require('./app');
const dotenv = require('dotenv');
const database = require('./config/database');


//Handling uncaught error
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Error`);
    process.exit(1);
});



// Config
dotenv.config({path:"config/config.env"});


database();


// connect to port
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})


// unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});