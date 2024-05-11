const express = require("express");
const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017/todos";
const Todo = require("./models/todos.js");
const todosRoutes = require("./routes/todos.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//view engine
app.set("view engine", "ejs");

// database connection
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected To Database !");
    app.listen(port, () => {
      console.log(`app on listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });

//routes
app.use("/api/todos", todosRoutes);
app.use(authRoutes);
app.get("/", (req, res) => res.render("home", res.locals));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.get("*", checkUser);
