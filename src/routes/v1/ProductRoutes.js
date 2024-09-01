const { Router } = require("express");
const productsController = require("../../controllers/productsController.js");
const { multipleImageUpload } = require("../../middlewares/ImageUpload.js");
const {adminAuthAndRoleCheck} = require("../../middlewares/authcheck.js");
const router = Router();

router.get("/count", adminAuthAndRoleCheck, productsController.countProducts);
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", multipleImageUpload, productsController.createProduct);
router.put("/:id", multipleImageUpload, productsController.updateProductById);
router.delete(
  "/:id",
  adminAuthAndRoleCheck,
  productsController.deleteProductById
);
router.get("/category/:category", productsController.getProductsByCategory);
module.exports = router;
