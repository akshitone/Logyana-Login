const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", { pageTitle: "Admin Login" });
});

module.exports = router;
