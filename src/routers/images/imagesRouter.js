const express = require("express");
const User = require("../../models/user/user");
const Image = require("../../models/images/image");
const auth = require("../../middleWare/auth");
const imageCount = require("../../middleWare/imageCount");
const sharp = require("sharp");
const router = express.Router();
const path = require("path");
const upload = require("../../middleWare/multer");

//----- user adding image
router.post(
  "/addImage",
  auth,
  imageCount,
  upload.single("file"),
  async (req, res) => {
    try {
      const { filename: filename } = req.file;
      await sharp(req.file.path)
        .resize(400, 400, {
          fit: "cover",
          background: {
            r: 255,
            b: 255,
            g: 255,
          },
        })
        .jpeg({ quality: 100 })
        .toFile(path.resolve(req.file.destination, "../resized", filename));
      const image = new Image();
      image.src = req.file.filename;
      image.owner = req.user._id;
      await image.save();
      res.status(201).send({ msg: "image is uploaded" });
    } catch (e) {
      if (e.message === "Input file contains unsupported image format") {
        res.status(401).send({ msg: "Accepting only jpg|jpeg|png" });
        return;
      }
      res.status(401).send();
    }
  }
);
//--------------------- getting user private images

router.get("/userpage/myimages", auth, async (req, res) => {
  try {
    const ownerId = req.user._id;
    const imagesPaths = await Image.find({ owner: ownerId });
    res.send(imagesPaths);
  } catch (e) {
    res.status(400).send(e);
  }
});

//--------------------- getting all images
router.get("/userpage/allimages", auth, async (req, res) => {
  try {
    const imagesPaths = await Image.find({});
    res.send(imagesPaths);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
