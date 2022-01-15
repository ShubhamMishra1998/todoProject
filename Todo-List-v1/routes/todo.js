const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");

router.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.render("todos/index", { todos });
});

router.get("/todos/new", (req, res) => {
  res.render("todos/new");
});

router.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/show", { todo });
});

router.get("/todos/:id/edit", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/edit", { todo });
});

router.post("/todos", async (req, res) => {
  const { todo } = req.body;
  await Todo.create({ todo });
  res.redirect("/todos");
});

router.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  await Todo.findByIdAndUpdate(id, { todo });
  res.redirect(`/todos/${id}`);
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
});

module.exports = router;
