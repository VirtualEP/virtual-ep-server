const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber } = req.body;

        if (!firstName || !lastName || !phoneNumber || !email) {
            return res.status(400).json({ message: 'Please make sure fields are not empty', error: 1 });
        }

        const user = await User.findOneAndUpdate(
            { email: email, _id: req.user._id }, // Find the user by email and current user ID
            { firstName, lastName, phoneNumber }, // Update the specified fields
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found', error: 1 });
        }

        return res.status(200).json({ message: "Profile information updated successfully", user });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Internal server error', error: 1 });
    }
});

module.exports = router;
