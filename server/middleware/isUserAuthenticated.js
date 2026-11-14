require("dotenv").config();
const jwt = require("jsonwebtoken");
const { AuthError } = require("../errors/ApiError");

function isUserAuthenticated(req, res, next) {
  const token = req.headers.tokenkey;
  if (token != "null") {
    jwt.verify(token, process.env.JWT_KEY);
    res.json({ message: "succesfull" });
  } else {
    throw new AuthError("Not logged in ")
  }
}

module.exports = isUserAuthenticated;
