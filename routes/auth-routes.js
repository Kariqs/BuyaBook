const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
