const express = require("express");
const router = express.Router();

// Import the user controllers
const userController = require("../../controllers/userController"); // Adjust the path as necessary
const adminAuthAndRoleCheck = require("../../middlewares/authcheck");

// Define routes

router.put("/tour/:userId", userController.updateUserTour);
// Route to update a user by ID
router.put("/:id", userController.updateUserById);
// Route to get users count
router.get("/count", adminAuthAndRoleCheck, userController.countUsers);
// Route to get user commandes
router.get("/commandes/:userId", userController.getUserCommandes);
// Route to fetch user level infos
router.get("/level/:userId", userController.getUserLevel);
// Route to delete a user by ID
router.delete("/:id", adminAuthAndRoleCheck, userController.deleteUserById);
// Route to fetch all users
router.get("/", adminAuthAndRoleCheck, userController.getAllUsers);
// Route to fetch a user by ID
router.get("/:id", userController.getUserById);

// Export the router
module.exports = router;
