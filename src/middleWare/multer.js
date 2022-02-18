const multer = require("multer");
const path = require("path");
const imagesDirPath = path.join(__dirname, "../../public/usersImages/original");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDirPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("wrong type of file"));
    }
    cb(undefined, true);
  },
});
const upload = multer({
  storage: storage,
});

module.exports = upload;
