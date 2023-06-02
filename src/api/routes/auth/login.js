const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const generateAccessToken = require('../../../util/signJwt');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ message: 'Invalid credentials. Please provide a valid email address and password' });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({ message: 'Invalid credentials. Please provide a valid email address and password' });
    }

    // Generate JWT token
    const token = generateAccessToken({ _id: user._id });

    return res.json({ token: token, user: { ...user._doc, password: null }, message: "Successfully logged in to your account", error: 0 });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong. Please try again later.',error: error.message });
  }
});

module.exports = router;
