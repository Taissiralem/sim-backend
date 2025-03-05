const multer = require("multer");
const upload = require("../config/multerConfig");
const cloudinary = require("../config/cloudinaryConfig");

exports.imageUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
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
    console.log("req.files", req.files);
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

exports.imageUpload2 = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(500).send("Error: " + err.message);
    }

    if (req.file) {
      // Check file type and set resource_type accordingly
      const resourceType = req.file.mimetype.startsWith("image/")
        ? "image"
        : "raw"; // 'raw' is for non-image files (PDF, Word, etc.)

      cloudinary.uploader.upload(
        req.file.path,
        { resource_type: resourceType }, // Specify resource_type
        (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error uploading file to Cloudinary");
          }
          req.image = result.secure_url;
          return next();
        }
      );
    } else {
      return res.status(400).send("No file provided.");
    }
  });
};
