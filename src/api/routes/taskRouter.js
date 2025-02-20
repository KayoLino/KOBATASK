const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

const { createTask, updateTask, deleteTask, getTasks, getTaskById } = require("../controllers/taskController");

router.post("/create", authGuard, createTask);
router.put("/:taskId", authGuard, updateTask);
router.get("/", authGuard, getTasks);
router.get("/:taskId", authGuard, getTaskById);
router.delete("/:taskId", authGuard, deleteTask);

module.exports = router;
