const { Router } = require("express");
const DevisController = require("../../controllers/Deviscontroller.js");
const router = Router();

router.post("/", DevisController.createDevis);
router.get("/", DevisController.getDevis);
router.get("/:id", DevisController.getDevisById);
router.put("/:id", DevisController.updateDevis);
router.delete("/:id", DevisController.deleteDevis);

module.exports = router;
