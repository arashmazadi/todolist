const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todos.js");
const todosRoute = require("./routes/todos.route.js");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/todos", todosRoute);

mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    console.log("Connected To Database !");
    app.listen(port, () => {
      console.log(`app on listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.get("/", (req, res) => {
  res.send("WellCome To Todo App");
});
