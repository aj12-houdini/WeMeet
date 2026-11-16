require("dotenv").config();
const bcrypt = require("bcrypt");
const jose = require("jose");
const userService = require("../services/UserService");
const { ValidationError } = require("../errors/ApiError");

async function signup(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    throw new ValidationError("Provide more information");

  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  const user = await userService.findByEmail(email);
  if (user)
    throw new ValidationError("User already registered");
  else {
    await userService.register(username, email, hashedPassword);
    res.json({ message: "added" });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ValidationError("Missing details");

  const user = await userService.findByEmail(email);

  if (user) {
    const matchedPasswords = await bcrypt.compare(password, user.password);
    const key = new TextEncoder().encode(process.env.JWT_KEY)
    if (matchedPasswords) {
      const token = await new jose.SignJWT({ _id: user._id.toString() }).setProtectedHeader({alg: "HS256"}).setExpirationTime("30d").sign(key)

      user.token = token;
      res.json({ id: user._id, username: user.username, token: token });
    }
  } else {
    throw new ValidationError("user does not exists");
  }
}



module.exports = { signup, signIn };
