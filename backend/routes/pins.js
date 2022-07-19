const router = require("express").Router();

//Importing database schema for a Pin
const Pin = require("../models/Pin");

//Create a pin
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save()
        res.status(200).json(savedPin)
    } catch (error) {
        //Trying to log errors on every step of API
        res.status(500).json(error);
    }
});

//Get all pins
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
      } catch (err) {
        res.status(500).json(err);
      }
    });
    

module.exports = router;