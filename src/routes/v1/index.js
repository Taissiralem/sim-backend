const { Router } = require("express");

const router = Router();
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
module.exports = router;
