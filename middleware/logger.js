// @desc Logs request to console
// this is a custom logger middleware but this module has been replaced by "morgan" module so it file isn't used.
// ex. GET /api/v1/courses/select=title 500 59.902 ms - 65
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

module.exports = logger;