const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../middleware/isUserAuthenticated");
const asyncHandler = require("../middleware/asyncHandler")
router.get("/dashboard", asyncHandler(isUserAuthenticated), (req, res) => {
  res.redirect("/");
});

module.exports = router;
