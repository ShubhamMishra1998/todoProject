const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
const User = require("../models/user");

router.get("/todos", async (req, res) => {
  const user = await User.findById(req.user._id).populate("todos");
  // console.log(user);
  // const todos = await Todo.find({});
  const todos = user.todos;
  console.log(todos);
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
  const userid = req.user._id;
  const user = await User.findById(userid);
  // console.log(user);
  const { todo } = req.body;
  const todoData = await Todo.create({ todo });
  // console.log(todoData._id);
  user.todos.push(todoData._id);
  await user.save();
  // console.log(user);

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
