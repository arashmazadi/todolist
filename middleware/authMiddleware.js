const jwt = require("jsonwebtoken");
const User = require("../models/users");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check jwt exists & is verified
  if (token) {
    jwt.verify(token, "arash secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        if (decodedToken.role !== "admin") {
          res.status(403).send();
          return;
        }
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "arash secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
