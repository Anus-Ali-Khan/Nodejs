const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  console.log(req.headers);
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allowed-Credentials", true);
  }
  next();
};

module.exports = credentials;
