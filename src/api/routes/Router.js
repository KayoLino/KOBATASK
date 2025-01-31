const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./authRouter"));

module.exports = router;