const allowedOrigins = require("../config/allowedOrigins");

const credentials = (res, req, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allowed-Credentials", true);
  }
  next();
};

module.exports = credentials;
