const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

TodoList = [];

app.get("/", (req, res) => {
  res.send(TodoList);
});

app.post("/post", (req, res) => {
  inputtodo = {
    todoID: TodoList.length + 1,
    todoTitle: req.body.title,
  };
  TodoList.push(inputtodo);
  res.json(inputtodo);
});

// app.put();

// app.delete();

app.listen(port, () => {
  console.log(`app on listening on port ${port}`);
});
