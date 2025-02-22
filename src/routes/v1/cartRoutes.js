const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/Cartcontroller");

router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.post("/clear", cartController.clearCart);
router.get("/:userId", cartController.getCart);

module.exports = router;
