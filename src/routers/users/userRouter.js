const express = require("express");
const User = require("../../models/user/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middleWare/auth");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");

//        register

router.post("/registerNewUser", async (req, res) => {
  const isEmailAlreadyExisted = await User.findOne({ email: req.body.email });
  if (isEmailAlreadyExisted != null) {
    res.status(400).send({ msg: "email already exists" });
    return;
  }
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ msg: "user registered", redirect: "/login" });
  } catch (error) {
    if (error.message === "User validation failed: email: email is not valid") {
      res.status(400).send({ msg: "email is not valid" });
    } else {
      res.status(401).send(error);
    }
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      res.status(400).send({ msg: "Email or Password are not correct" });
      return;
    }
    isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordCorrect === false) {
      res.status(400).send({ msg: "Email or Password are not correct" });
      return;
    }
    const token = jwt.sign({ _id: user._id.toString() }, KEY);
    user.token = token;
    await user.save();
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send({
      redirect: "/userpage",
      msg: "validUser",
    });
  } catch (e) {
    res.status(400).send(e);
  }
});
// get user page
router.get("/userpage", auth, async (req, res) => {
  try {
    const user = req.user;
    const userName = user.name.toUpperCase();
    res.render("userPage", {
      name: userName,
      email: user.email,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// logout
router.get("/logout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.token = "";
    await user.save();
    res.redirect("/");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
