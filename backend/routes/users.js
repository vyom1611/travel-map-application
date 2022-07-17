const router = require("express").Router();
const bcrypt = require("bcrypt");

//Getting the User json schema
const User = require("../models/User");


//Register
router.post("/register", async (req, res) => {
    try {
        //Create new user
        const newUser = new User({
            username: res.body.username,
            email: res.body.email,
            password: hashedPassword
        })


        //Generating password
        const salt = await bcrypt.genSalt(10)
            //Hasing password
            const hashedPassword = await bcrypt.hash(req.body.password)

        //Saving user to database
        const user = await newUser.save()
        //Sending OK status with the user ID from the database
        res.status(200).json(user._id)
        
    } catch (error) {
        //Logging errors on every step
        res.status(500).json(error);
    }
})



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
        const validPassword = await bcrypt.compare(req.body.password, user);

        //Step 3:
        res.status(200).json({ _id: user._id, username: user.username});
        
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;