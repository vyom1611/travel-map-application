const mongoose = require("mongoose");


//Defining database's json schematic for pin service
const PinSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            min: 4,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            min: 5,
        },
        //latitude coord
        lat: {
            type: Number,
            require: true,
        },
        //Longitude coord
        long: {
            type: Number,
            require: true,
        }
    }, { timestamps: true}
)

module.exports = mongoose.model("Pin", PinSchema)

