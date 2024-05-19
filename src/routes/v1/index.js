const { Router } = require("express");

const router = Router();
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/parametres", require("./parametresRoutes"));
router.use("/products", require("./ProductRoutes"));
router.use("/commandes", require("./commandesRoutes"));
module.exports = router;
