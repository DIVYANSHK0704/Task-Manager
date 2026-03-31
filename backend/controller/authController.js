const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminOnly } = require("../middleware/authMiddleware");

//Generate jwt token
const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

//@desc register a new user
//@route post/api/auth/login
//@access public
const registerUser =async (req,res) => {
    try {
        const {name,email,password,profileImageUrl,adminInviteToken} = req.body;

    //check if user already exists
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: "user already exists"})
    }

    //determine  user role: admin if correct token is provided, otherwise member
    let role = "member";
    if(
        adminInviteToken &&
        adminInviteToken == process.env.ADMIN_INVITE_TOKEN
     ) {
        role ="admin";
    }

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        role
    });

    //return user data jwt
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id),
    });
    
    } catch (error) {
        res.status(500).json({message:"server error", error: error.message});
    }
};

//@desc login user
//@route post/api/auth/login
//@access public
const loginUser =async (req,res) => {   try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

    // Return user data with JWT
    res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImageUrl: user.profileImageUrl,
    token: generateToken(user._id),
    });

    } catch (error) {
        res.status(500).json({message:"server error", error: error.message});
    }};

//@desc get user profile
//@route post/api/auth/login
//@access private(reqire jwt)
const getUserProfile =async (req,res) => {   try {
        
    } catch (error) {
        res.status(500).json({message:"server error", error: error.message});
    }};

//@desc update user profile
//@route post/api/auth/login
//@access private(require jwt)
const updateUserProfile =async (req,res) => {   try {
        
    } catch (error) {
        res.status(500).json({message:"server error", error: error.message});
    }};

module.exports = {registerUser,loginUser,getUserProfile,updateUserProfile};