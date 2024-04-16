const express = require("express");
const Product = require("../models/todos.js");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos.controller.js");

router.get("/", getTodos);
router.get("/:id", getTodo);

router.post("/", createTodo);

// update a product
router.put("/:id", updateTodo);

// delete a product
router.delete("/:id", deleteTodo);

module.exports = router;
