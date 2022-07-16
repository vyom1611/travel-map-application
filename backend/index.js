const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

//Calling the dotenv config file for the MONGO URL
dotenv.config()


//Commecting to the MongoDB database using mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true,}
    //If connection was successful
    .then(() => console.log("Connected to the Mongo Database"))
    .catch((err) => console.log("Error:", err))
);


//Server init message
app.listen(8800, () => console.log(`backend server is running`))