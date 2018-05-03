

// middlewareFn(req, res, next)

module.exports = (req, res, next) => {
    const time = new Date().toLocaleTimeString();
    // console.log(req.method, time);
    req.infoStamp = `Request type: ${req.method}; at ${time} h`;
    // console.log(req);
    next();
}