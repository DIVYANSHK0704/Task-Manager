const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getUser, getUserById } = require("../controller/userController");

const router = express.Router();

//user management routes
router.get("/",protect,adminOnly,getUser);
router.get("/:id",protect,getUserById);


module.exports = router;