const express = require("express");
const router = express.Router();

// Import the user controllers
const userController = require("../../controllers/userController"); // Adjust the path as necessary

// Define routes

// Route to update a user by ID
router.put("/:id", userController.updateUserById);

// Route to delete a user by ID
router.delete("/:id", userController.deleteUserById);

// Route to fetch all users
router.get("/", userController.getAllUsers);

// Route to fetch a user by ID
router.get("/:id", userController.getUserById);

// Export the router
module.exports = router;
