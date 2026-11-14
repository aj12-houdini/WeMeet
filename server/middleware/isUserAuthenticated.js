require("dotenv").config();
const jose = require("jose");
const { AuthError } = require("../errors/ApiError");

async function isUserAuthenticated(req, res, next) {
  const token = req.headers.tokenkey;
  if (token != "null") {
    const payload = await jose.jwtVerify(token, process.env.JWT_KEY, {algorithms: ["HS256"]});
    res.json({ message: "succesfull" });
  } else {
    throw new AuthError("Not logged in ")
  }
}

module.exports = isUserAuthenticated;
