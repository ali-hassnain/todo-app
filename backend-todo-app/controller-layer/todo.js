const express = require("express");
const {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
  getTodos,
} = require("../service-layer/todo");
const router = express.Router();
router.post("/", createTodo);
router.get("/:id", getTodo);
router.get("/", getTodos);
router.put("/", updateTodo);
router.delete("/", deleteTodo);

module.exports = router;
