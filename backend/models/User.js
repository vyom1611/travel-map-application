const mongoose = require("mongoose");


//Defining the schematic for all incoming and outgoing http requests and responses from the database
//All json data going in would have this format
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 10,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    },
        { timestamps: true }
);