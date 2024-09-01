const { Router } = require("express");
const Contactcontroller = require("../../controllers/Contactcontroller.js");
const {adminAuthAndRoleCheck} = require("../../middlewares/authcheck.js");
const router = Router();

router.get("/",  Contactcontroller.getAllMessage);
router.post("/create", Contactcontroller.createContactMessage);
router.delete("/:id", Contactcontroller.deleteContact);

module.exports = router;
