const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./authRouter"));
router.use("/api/users", require("./userRouter"));
router.use("/api/tasks", require("./taskRouter"));

module.exports = router;