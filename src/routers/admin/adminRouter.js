const express = require("express");
const router = express.Router();
const User = require("../../models/user/user");
const Image = require("../../models/images/image");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const adminAuth = require("../../middleWare/adminAuth");
const fse = require("fs-extra");
const path = require("path");
// path to the images directory to delete them
const originalImagesPath = path.join(
  __dirname,
  "../../../public/usersImages/original"
);
const resizedImagesPath = path.join(
  __dirname,
  "../../../public/usersImages/resized"
);
// get admin page
router.get("/admin", (req, res) => {
  res.render("admin");
});

//admin login
router.post("/admin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
      res.status(400).send();
      return;
    }
    isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordCorrect === false) {
      res.status(400).send();
      return;
    }
    isAdmin = user.admin;
    if (!isAdmin) {
      res.status(400).send();
      return;
    }
    const token = jwt.sign({ _id: user._id.toString() }, KEY);
    user.token = token;
    await user.save();
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send({
      redirect: "/admin/control",
      msg: "validadmin",
    });
  } catch (e) {
    res.status(400).send(e);
  }
});
// admin control page
router.get("/admin/control", adminAuth, (req, res) => {
  res.render("adminControl");
});

//admin delete all users
router.get("/admin/control/deleteusers", adminAuth, async (req, res) => {
  try {
    const deletedUser = await User.deleteMany({ admin: false });
    res.send({ msg: deletedUser.deletedCount });
  } catch (e) {
    res.status(400).send(e);
  }
});
// admin delete all images
router.get("/admin/control/deleteimages", adminAuth, async (req, res) => {
  try {
    fse
      .emptyDir(originalImagesPath)
      .then(() => {
        fse.emptyDir(resizedImagesPath);
      })
      .then(() => {
        console.log("deleted");
      })
      .catch((e) => {
        console.log(e);
      });
    const deletedImages = await Image.deleteMany({});
    res.send({ msg: deletedImages.deletedCount });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
