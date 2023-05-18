const jwt = require('jsonwebtoken');

function staticAuthenticateToken(req, res, next) {

    const token = req.query.token
    next()

    // if (token == null) return res.sendStatus(401)

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    //     if (err) return res.sendStatus(403)

    //     req.user = user

    //     next()
    // })

}

module.exports = staticAuthenticateToken 