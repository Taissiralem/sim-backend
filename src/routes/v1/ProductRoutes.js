const { Router } = require("express");
const productsController = require("../../controllers/productsController");
const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.delete("/:id", productsController.deleteProductById);
router.post("/createproduct", productsController.createProduct);
router.put("/:id", productsController.updateProductById);
router.get("/count", productsController.countProducts);

module.exports = router;
