const express = require('express');
const { User } = require('../../../database/models/User');
const bcrypt = require("bcrypt");
const router = express.Router();
const generateAccessToken = require('../../../util/signJwt');

router.post('/', async (req, res) => {
  const { firstName, lastName, country, email, password, type } = req.body;

  try {
    // Check if fields exist and are not empty
    if (!firstName || !lastName || !country || !email || !password || !type || firstName === "" || lastName === "" || country === "" || email === "" || password === "" || type === "") {
      return res.status(402).json({ message: 'Please make sure to provide all required fields and ensure they are not empty' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(402).json({ message: 'User with this email address exists. Please try logging in.' });
    }

    // Generate a salt for password hashing
    const genSalt = await bcrypt.genSalt(parseInt(process.env.GEN_SALT));

    // Hash the password
    const securePassword = await bcrypt.hash(password, genSalt);

    // Create a new user account
    const userAccount = new User({ ...req.body, password: securePassword, accountType: type });

    // Save the user account
    const savedUser = await userAccount.save();

    // Assign the user a JWT for future request verification
    const token = generateAccessToken({ _id: savedUser._id });

    return res.status(200).json({ message: 'Your account has been created successfully. Log in to continue', user: savedUser, token: token });

  } catch (error) {
    console.log(error);
    return res.status(402).json({ message: 'Something happened, please try again later.' });
  }
});

module.exports = router;
