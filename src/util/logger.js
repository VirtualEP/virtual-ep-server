function logger(req, res, next) {

    try {
        console.log(`${req.ip}:[${req.method}]: ${req.baseUrl}`)
    } catch (error) {

    }

    next();

}

module.exports = logger;