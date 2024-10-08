const { Router } = require("express");
const CommandesController = require("../../controllers/commandescontroller.js");
const { adminAuthAndRoleCheck } = require("../../middlewares/authcheck.js");
const router = Router();
router.get(
  "/validate/:id",
  adminAuthAndRoleCheck,
  CommandesController.ValidateCommandes
);
router.get("/count", adminAuthAndRoleCheck, CommandesController.countCommandes);
router.get(
  "/validatedcount",
  adminAuthAndRoleCheck,
  CommandesController.ValidatedCommandesCount
);
router.get(
  "/pendingcount",
  adminAuthAndRoleCheck,
  CommandesController.PendigCommandesCount
);
router.post("/create", CommandesController.createCommande);
router.delete("/:id", CommandesController.deleteCommandeById);
router.get("/", adminAuthAndRoleCheck, CommandesController.getAllCommandes);
router.get(
  "/getbyfamily",
  adminAuthAndRoleCheck,
  CommandesController.getOrdersByFamily
);
router.get("/:id", CommandesController.getCommandeById);
module.exports = router;
