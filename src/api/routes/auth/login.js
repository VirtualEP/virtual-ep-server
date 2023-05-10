const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const generateAccessToken = require('../../../util/signJwt');


router.post('/', async (req, res) => {

    // TODO: get phone number 
    const { email, password } = req.body;

    if (!email || !password) return res.status(404).json({ message: 'Please make sure to price all fileds required' })

    // check if user is already registered
    const userExists = await User.findOne({ email: email });


    if (!userExists) return res.status(403).json({ message: 'Invalid credentials. please provide a valid email address nad password' })


    // time to validate password
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, userExists.password);
    } catch (error) {
        isValidPassword = false;
    }

    if (!isValidPassword) return res.status(403).json({ message: 'Invalid credentials. please provide a valid email address nad password' })


    // asssign the user a jwt for future request verification
    const token = generateAccessToken({ _id: userExists._id });



    return res.json({ token: token, user: { ...userExists._doc, password: null }, message: "successfully logged in into your account", error: 0 })




})

module.exports = router;