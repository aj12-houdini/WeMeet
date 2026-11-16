require("dotenv").config();
const jose = require("jose");
const { AuthError } = require("../errors/ApiError");

async function isUserAuthenticated(req, res) {
  const token = req.headers.tokenkey;
  if (token != "null") {
    try{
      const payload = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY), {algorithms: ["HS256"]});
      console.log(payload)
      res.json({ message: "succesfull" });

    }
    catch {
      throw new AuthError("Not Logged in ")
    }
  } else {
    console.log("Error");
    throw new AuthError("Not logged in ")
  }
}

module.exports = isUserAuthenticated;
