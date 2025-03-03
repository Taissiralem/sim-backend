const express = require("express");
const router = express.Router();

// Import the user controllers
const userController = require("../../controllers/userController.js"); // Adjust the path as necessary
const {
  adminAuthAndRoleCheck,
  userAuthAndRoleCheck,
} = require("../../middlewares/authcheck.js");

// Define routes

router.put(
  "/tour/:userId",
  userAuthAndRoleCheck,
  userController.updateUserTour
);
// Route to update a user by ID
router.put("/:id", userAuthAndRoleCheck, userController.updateUserById);
// Route to get users count
router.get("/count", adminAuthAndRoleCheck, userController.countUsers);
// Route to get user commandes
router.get(
  "/commandes/:userId",
  userAuthAndRoleCheck,
  userController.getUserCommandes
);
router.get("/devis/:userId", userAuthAndRoleCheck, userController.getUserDevis);
// Route to fetch user level infos
router.get("/level/:userId", userAuthAndRoleCheck, userController.getUserLevel);
// Route to fetch all user levels
router.get("/levels", adminAuthAndRoleCheck, userController.getAllUserLevels);
// Route to delete a user by ID
router.delete("/:id", adminAuthAndRoleCheck, userController.deleteUserById);
// Route to fetch all users
router.get("/", adminAuthAndRoleCheck, userController.getAllUsers);
router.get(
  "/pendingType",
  adminAuthAndRoleCheck,
  userController.getAllUsersWithPendingType
);
router.put(
  "/add-code-client/:id",
  adminAuthAndRoleCheck,
  userController.addCodeClient
);

// Route to fetch a user by ID
router.get("/:id", userAuthAndRoleCheck, userController.getUserById);
// Route to attribute a user
router.put("/type/:id", userAuthAndRoleCheck, userController.attributeUser);
// Route to validate attribution
router.put(
  "/validate-attribution/:id",
  adminAuthAndRoleCheck,
  userController.validateAttribution
);
// Route to add a code client

// Export the router
module.exports = router;
