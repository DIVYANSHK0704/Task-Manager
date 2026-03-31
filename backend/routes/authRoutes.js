const express = require("express");
const {registerUser,loginUser,getUserProfile,updateUserProfile} = require("../controller/authController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

//AUTH ROUTES

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);

module.exports = router;