const Image = require("../models/images/image");
const config = require("config");
const imageCount = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.admin === true) {
      return next();
    }
    const images = await Image.find({ owner: user._id });
    if (images.length >= 3) {
      throw Error("max");
    } else {
      next();
    }
  } catch (e) {
    if (e.message === "max") {
      res.send({ msg: "You can upload up to 3 images only" });
    }
  }
};

module.exports = imageCount;
