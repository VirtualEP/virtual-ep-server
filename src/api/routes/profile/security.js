const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { enableEmailFA, enablePhoneFA, newPassword } = req.body;
        console.log(req.user);

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found', error: 1 });
        }


        user.securityOption.emailFa = enableEmailFA || user.securityOption.emailFa;
        user.securityOption.phoneFa = enablePhoneFA || user.securityOption.phoneFa;

        // Change the password if a new password is provided
        if (newPassword) {
            user.password = newPassword;
        }

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Security options and password updated successfully', user });
    } catch (error) {
        console.error('Error updating security options:', error);
        return res.status(500).json({ message: 'Internal server error', error: 1 });
    }
});

module.exports = router;

