const { Router } = require("express");

const router = Router();
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/categories", require("./categoriesRoutes"));
router.use("/products", require("./ProductRoutes"));
module.exports = router;
