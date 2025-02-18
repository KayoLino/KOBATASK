const express = require("express");
const router = express.Router();

const { getUserProfile, updateUserProfile } = require("../controllers/userController");

const authGuard = require('../middlewares/authGuard');
const multerMiddleware = require("../middlewares/multerMiddleware");
const { updateValidation } = require("../middlewares/updateValidation");
const validate = require("../middlewares/handleValidation");

router.get("/profile", authGuard, getUserProfile);
router.put("/update", authGuard, multerMiddleware, updateValidation(), validate, updateUserProfile);

module.exports = router;