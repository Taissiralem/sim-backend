const { Router } = require("express");
const productsController = require("../../controllers/productsController");
const { multipleImageUpload } = require("../../middlewares/ImageUpload");
const router = Router();

router.get("/count", productsController.countProducts);
router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", multipleImageUpload, productsController.createProduct);
router.put("/:id", productsController.updateProductById);
router.delete("/:id", productsController.deleteProductById);
module.exports = router;
