const { Router } = require("express");
const Contactcontroller = require("../../controllers/Contactcontroller");
const {adminAuthAndRoleCheck} = require("../../middlewares/authcheck");
const router = Router();

router.get("/",  Contactcontroller.getAllMessage);
router.post("/create", Contactcontroller.createContactMessage);
router.delete("/:id", Contactcontroller.deleteContact);

module.exports = router;
