const express = require("express");
const router = express.Router();
const {
  createFamille,
  createCategory,
  createType,
  getAllFamilles,
  getAllCategories,
  getAllTypes,
} = require("../../controllers/parametresController"); // Update with the actual path to your controller file

// Route to create a new famille
router.post("/famille", createFamille);

// Route to create a new category
router.post("/category", createCategory);

// Route to create a new type
router.post("/type", createType);

// Route to get all familles
router.get("/famille", getAllFamilles);

// Route to get all categories
router.get("/category", getAllCategories);

// Route to get all types
router.get("/type", getAllTypes);

module.exports = router;
