const express = require("express");
const router = express.Router();

const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const authGuard = require('../middlewares/authGuard');
const multerMiddleware = require("../middlewares/multerMiddleware");

router.get("/profile", authGuard, getUserProfile);
router.put("/updateProfile", authGuard, multerMiddleware, updateUserProfile);

module.exports = router;