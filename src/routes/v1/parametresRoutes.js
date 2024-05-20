const express = require("express");
const router = express.Router();
const {
  createFamille,
  createCategory,
  createType,
  getAllFamilles,
  getAllCategories,
  getAllTypes,
  deleteFamille,
  deleteCategory,
  deleteType,
  countFamilles,
  countCategories,
  countTypes,
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

// Route to delete a famille by ID
router.delete("/famille/:id", deleteFamille);

// Route to delete a category by ID
router.delete("/category/:id", deleteCategory);

// Route to delete a type by ID     
router.delete("/type/:id", deleteType); 

// Route to get familles count
router.get("/famille/count", countFamilles);

// Route to get categories count
router.get("/category/count", countCategories);

// Route to get types count
router.get("/type/count", countTypes);


module.exports = router;
