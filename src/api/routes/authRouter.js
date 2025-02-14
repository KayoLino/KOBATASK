
const express = require("express");
const router = express.Router();

const { userCreateValidation, loginvalidation } = require("../middlewares/authValidation");
const validate = require("../middlewares/handleValidation");

const { register, login, logout, authCheck } = require("../controllers/authController");
const { refreshAccessToken } = require("../controllers/refreshTokenController");



router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginvalidation(), validate, login);
router.post("/logout", logout);
router.get("/authCheck", authCheck);
router.post("/refresh-token", refreshAccessToken);

module.exports = router;