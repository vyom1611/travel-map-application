const router = require("express").Router();
const bcrypt = require("bcrypt");

//Getting the User json schema
const User = require("../models/User");


//Register
router.post("/register", async (req, res) => {
    try {

        //Generating password
        const salt = await bcrypt.genSalt(10)
        //Hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })


        //Saving user to database
        const user = await newUser.save()
        //Sending OK status with the user ID from the database
        res.status(200).json(user._id)
        } catch (err) {
        //Logging errors on every step
        res.status(500).json(err);
    }
});



//Login
router.post("/login", async (req, res) => {
    try {
        // Steps for login:
        // 1. Finding User
        // 2. Validating password
        // 3. Sending response

        //Step 1:
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(400).json("Wrong password or user");

        //Step 2:
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        //Step 3:
        res.status(200).json({ _id: user._id, username: user.username});
        
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;
