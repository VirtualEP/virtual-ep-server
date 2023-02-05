const express = require('express');
const { User } = require('../../../database/models/User');
const bcrypt = require("bcrypt");
const router = express.Router();



router.post('/', async (req, res) => {

    const { firstName, lastName, country, email, password, type } = req.body;

    // check if filed exist in the body
    if (!firstName || !lastName || !country || !email || !password || !type) return res.status(402).json({ message: 'Please make sure to price all fileds required' })

    // check if fields are empty;
    if (firstName == "" || lastName == "" || country == "" || email == "" || password == "" || type == "") return res.status(402).json({ message: 'Please make sure that all fileds are not empty' })

    // check if email exist
    const existingUser = await User.findOne({ email: email })

    if (existingUser) return res.status(402).json({ message: 'User with this email address exist. please try loggin.' })

    const genSalt = await bcrypt.genSalt(parseInt(process.env.GEN_SALT))

    const securePassword = await bcrypt.hash(password, genSalt)

    const userAccount = new User({ ...req.body, password: securePassword, accountType: type });

    try {
        const savedUser = userAccount.save()

        // asssign the user a jwt for future request verification
        const token = generateAccessToken({ _id: savedUser._id });

        if (savedUser) return res.status(200).json({ message: 'Your account has been created sucessfully.login in to continue', user: savedUser, token: token })
    } catch (error) {
        return res.status(402).json({ message: 'Something happened please try again latter.' })
    }

})

module.exports = router;