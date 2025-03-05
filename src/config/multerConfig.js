const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.endsWith("pdf") ||
      file.mimetype.includes("word")
    ) {
      return cb(null, true);
    }
  },
});

module.exports = upload;
