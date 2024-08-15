const mongoose = require("mongoose");
const dotenv = require('dotenv');


mongoose.set('strictQuery', false);

dotenv.config({ path: "config/config.env" });


const connectDatabase = () =>{  
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log(`Database connected with: ${process.env.DB_URL}`);
    })
}

module.exports = connectDatabase;