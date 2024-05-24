const { Router } = require("express");

const router = Router();
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/parametres", require("./parametresRoutes"));
router.use("/products", require("./ProductRoutes"));
router.use("/commandes", require("./commandesRoutes"));
router.use("/newsletter", require("./Newsletter"));
module.exports = router;
