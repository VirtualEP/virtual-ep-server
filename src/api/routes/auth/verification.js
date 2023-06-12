const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Verify user's email
router.get('/:token', async (req, res) => {
    try {
        const token = req.params.token;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;


        // Find the user in the database
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: 'Invalid or Expired token provided', message: "Please make sure you have the correct link and try again." });
        }

        // Update user's verification status
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verification successful. You can now log in.' });
    } catch (error) {
        console.error('Error during email verification', error);
        res.status(500).json({ error: 'Email verification failed', message: "Please make sure you have the correct link and try again." });
    }
});


module.exports = router;