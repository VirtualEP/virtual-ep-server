const express = require('express');
const staticAuthenticateToken = require('../../middlewares/staticAuth');
const router = express.Router();

router.post('/', staticAuthenticateToken, (req, res) => {
    return res.status(200).json({ value: 'null' });
});

module.exports = router;
