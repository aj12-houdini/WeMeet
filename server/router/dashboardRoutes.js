const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/isUserAuthenticated");

router.get("/dashboard", isUserAuthenticated, (req, res) => {
  res.redirect("/");
});

module.exports = router;
