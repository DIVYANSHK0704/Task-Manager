const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate jwt token
const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

//@desc register a new user
//@route post/api/auth/login
//@access public
const registerUser =async (req,res) => {};

//@desc login user
//@route post/api/auth/login
//@access public
const loginUser =async (req,res) => {};

//@desc get user profile
//@route post/api/auth/login
//@access private(reqire jwt)
const getUserProfile =async (req,res) => {};

//@desc update user profile
//@route post/api/auth/login
//@access private(require jwt)
const updateUserProfile =async (req,res) => {};

module.exports = {registerUser,loginUser,getUserProfile,updateUserProfile};