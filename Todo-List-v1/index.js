const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(todoRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
