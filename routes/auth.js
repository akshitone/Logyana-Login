const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("login", { pageTitle: "Login" });
});
router.get("/register", (req, res, next) => {
  res.render("register", { pageTitle: "Register" });
});
router.get("/", (req, res, next) => {
  const user = null;
  res.render("index", { pageTitle: "Dashboard", user: user });
});

module.exports = router;
