const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/admin", authController.getAdminLogin);
router.post("/admin", authController.postAdminLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);
router.get("/", authController.getDashboard);

module.exports = router;
