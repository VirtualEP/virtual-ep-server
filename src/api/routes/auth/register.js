const express = require('express');
const { User } = require('../../../database/models/User');
const bcrypt = require("bcrypt");
const router = express.Router();
const { default: axios } = require('axios');
const jwt = require('jsonwebtoken')

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

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET);
    const trustkey = jwt.sign('api.key.token', process.env.SMTP_SECRET);

    // Create a new user account
    const userAccount = new User({ ...req.body, password: securePassword, accountType: type, verificationToken });

    // Save the user account
    await userAccount.save();

    // Send verification email
   await axios.get(process.env.SMTP_SERVER + `/verification?email=${email}&&user=${firstName + lastName}&&pubKey=${verificationToken}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${trustkey}`
        },
      }
    )
    return res.status(200).json({ message: 'Your account has been created successfully. Please verify your email to continue.' });


  } catch (error) {
    await User.findOneAndDelete({ email })
    console.log(error.message);
    return res.status(402).json({ message: 'Something happened, please try again later.' });
  }
});

module.exports = router;
