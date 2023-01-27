const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();



router.post('/', async (req, res) => {

    const { firstname, lastname, country, email, password } = req.body;

    // check if filed exist in the body
    if (!firstname || !lastname || !country || !email || !password) return res.status(402).json({ message: 'Please make sure to price all fileds required' })

    // check if fields are empty;
    if (firstname == "" || lastname == "" || country == "" || email == "" || password == "") return res.status(402).json({ message: 'Please make sure that all fileds are not empty' })

    // check if email exist
    const existingUser = await User.findOne({ email: email })

    if (existingUser) return res.status(402).json({ message: 'User with this email address exist. please try loggin.' })


    const userAccount = new User({ ...req.body });

    try {
        const savedUser = userAccount.save()
        if (savedUser) return res.status(402).json({ message: 'Your account has been created sucessfully.login in to continue' })
    } catch (error) {
        return res.status(402).json({ message: 'Something happened please try again latter.' })
    }

})

module.exports = router;