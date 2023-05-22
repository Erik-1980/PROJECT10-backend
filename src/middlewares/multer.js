const multer = require("multer");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueId = uuid.v4();
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniqueId}.${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

