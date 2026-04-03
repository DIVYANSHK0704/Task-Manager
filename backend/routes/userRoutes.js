const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getUser, getUserById, deleteUser } = require("../controller/userController");

const router = express.Router();

//user management routes
router.get("/",protect,adminOnly,getUser);
router.get("/:id",protect,getUserById);
router.delete("/:id",protect,adminOnly,deleteUser);

module.exports = router;