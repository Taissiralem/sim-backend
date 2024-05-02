const { Router } = require("express");

const router = Router();

router.use("/api/v1", require("./v1"));

module.exports = router;
