const express = require("express");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
  completeTask,
  incompleteTask
} = require("../controllers/taskController");

router.post("/", authGuard, createTask);
router.put("/:taskId", authGuard, updateTask);
router.get("/", authGuard, getTasks);
router.get("/:taskId", authGuard, getTaskById);
router.delete("/:taskId", authGuard, deleteTask);
router.put("/:taskId/complete", authGuard, completeTask);
router.put("/:taskId/incomplete", authGuard, incompleteTask);

module.exports = router;
