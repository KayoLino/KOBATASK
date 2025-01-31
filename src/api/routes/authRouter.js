
const express = require("express");
const router = express.Router();

const { userCreateValidation, loginvalidation } = require("../middlewares/userValidation");
const validate = require("../middlewares/handleValidation");

const { register, login, logout, authCheck } = require("../controllers/userController");


router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginvalidation(), validate, login);
router.post("/logout", logout);
router.get("/authCheck", authCheck);

module.exports = router;