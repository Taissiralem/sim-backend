const { Router } = require("express");
const authcontroller = require("../../controllers/authController");
const router = Router();
router.post("/signup", authcontroller.signup);
router.post("/signin", authcontroller.signin);
module.exports = router;
