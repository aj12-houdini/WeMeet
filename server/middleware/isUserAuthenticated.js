require("dotenv").config();
const jwt = require("jsonwebtoken");

function isUserAuthenticated(req, res, next) {
  const token = req.headers.tokenkey;
  if (token != "null") {
    jwt.verify(token, process.env.JWT_KEY);
    res.json({ message: "succesfull" });
  } else {
    res.json({ message: "Unsucesfull" });
  }
}

module.exports = isUserAuthenticated;
