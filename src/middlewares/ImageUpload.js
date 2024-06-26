const multer = require("multer");
const upload = require("../config/multerConfig");
const cloudinary = require("../config/cloudinaryConfig");

exports.imageUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(500).send("Error: " + err.message);
    }
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error uploading image to Cloudinary");
        }
        req.image = result.secure_url;
        return next();
      });
    } else {
      return res.status(400).send("No file provided.");
    }
  });
};

exports.multipleImageUpload = (req, res, next) => {
  
  upload.array("images", 10)(req, res, (err) => {
    console.log("req.files", req.files)
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(500).send("Error: " + err.message);
    }
    if (!req.files || req.files.length === 0) {
      return next();
    }
    const uploadedImages = [];
    req.files.forEach((file, index, array) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error uploading image to Cloudinary");
        }
        uploadedImages.push(result.secure_url);
        if (uploadedImages.length === array.length) {
          req.imageURLs = uploadedImages;
          next();
        }
      });
    });
  });
};
