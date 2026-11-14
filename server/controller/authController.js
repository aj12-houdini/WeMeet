require("dotenv").config();
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


async function signup(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Provide more information" });

  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  const user = await User.findOne({ email: email });
  if (user)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already registered",
    });
  else {
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    newUser.save();
    res.json({ message: "added" });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Missing details" });

  const user = await User.findOne({ email: email });

  if (user) {
    const matchedPasswords = await bcrypt.compare(password, user.password);

    if (matchedPasswords) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });

      user.token = token;
      res.json({ id: user._id, username: user.username, token: token });
    }
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "user does not exists" });
  }
}



module.exports = { signup, signIn };
