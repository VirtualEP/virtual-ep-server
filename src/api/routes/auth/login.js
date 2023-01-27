const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const generateAccessToken = require('../../../util/signJwt');


router.post('/', async (req, res) => {


    // TODO: get phone number 
    const { email, password } = req.body;

    // check if user is already registered
    const userExists = User.findOne({ email: email });

    if (!userExists) return res.status(403).json({ message: 'Imvalid credentials. please provide a valid email address nad password' })


    // time to validate password
    const isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) return res.status(403).json({ message: 'Imvalid credentials. please provide a valid email address nad password' })


    // asssign the user a jwt for future request verification

    const token = generateAccessToken({ _id: userExists._id });



    return res.json({ token: token, message: "Code sent successfully", error: 0 })




})

module.exports = router;