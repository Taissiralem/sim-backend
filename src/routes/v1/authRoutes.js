const { Router } = require("express");
const authcontroller = require("../../controllers/authController");
const {
  isResetTokenValidUser,
} = require("../../middlewares/resetTokenValidation");
const router = Router();
router.post("/signup", authcontroller.signup);
router.post("/signin", authcontroller.signin);
router.post("/passforgot", authcontroller.forgotPasswordUser);
router.post("/resetpass", isResetTokenValidUser, authcontroller.resetpassword);

module.exports = router;
