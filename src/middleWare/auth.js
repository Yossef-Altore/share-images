const jwt = require("jsonwebtoken");
const User = require("../models/user/user");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const auth = async (req, res, next) => {
  try {
    const id = jwt.verify(req.cookies.token, KEY);
    if (id) {
      const user = await User.findOne({ _id: id });
      if (req.cookies.token != user.token) {
        res.redirect("/login");
        return;
      }
      req.user = user;
    }
    next();
  } catch (e) {
    if (e.message === "invalid signature") {
      res.redirect("/login");
    }
  }
};

module.exports = auth;
