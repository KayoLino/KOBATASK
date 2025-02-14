const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./authRouter"));
router.use("/api/users", require("./userRouter"));

module.exports = router;