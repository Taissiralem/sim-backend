const { Router } = require("express");
const DevisController = require("../../controllers/Deviscontroller.js");
const { adminAuthAndRoleCheck } = require("../../middlewares/authcheck.js");
const { imageUpload2 } = require("../../middlewares/ImageUpload.js");
const router = Router();

router.post("/", DevisController.createDevis);
router.get("/", adminAuthAndRoleCheck, DevisController.getDevis);
router.get("/count", adminAuthAndRoleCheck, DevisController.getDevisCount);
router.put(
  "/addfile/:id",
  adminAuthAndRoleCheck,
  imageUpload2,
  DevisController.addFiletoDevis
);
router.put("/:id", adminAuthAndRoleCheck, DevisController.updateDevis);
router.get("/:id", adminAuthAndRoleCheck, DevisController.getDevisById);
router.delete("/:id", adminAuthAndRoleCheck, DevisController.deleteDevis);

router.put(
  "/removefile/:id",
  adminAuthAndRoleCheck,
  DevisController.removeFileFromDevis
);

module.exports = router;
