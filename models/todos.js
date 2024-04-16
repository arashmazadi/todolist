const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  todotitle: {
    type: String,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
