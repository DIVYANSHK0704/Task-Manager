const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc get all user
//@route get/api/users
//@access private
const getUser = async (req,res) => {
    try {
        const users = await User.find({role:'member'}).select("-password");
        
        //Add task count to each user
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({assignedTo: user._id, status:"Pending"});
            const inProgressTasks = await Task.countDocuments({assignedTo: user._id, status:"In Progress"});
            const completedTasks = await Task.countDocuments({assignedTo: user._id, status:"Completed"});

            return {
                ...user._doc, //include existing data
                pendingTasks,
                inProgressTasks,
                completedTasks,
            };
        }));

        res.json(userWithTaskCounts);
    } catch (error) {
        res.status(500).json({message :"server error", error: error.message
        });
    }
};

//@desc get user by id
//@route get/api/users
//@access private
const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message: "user not found"});
        res.json(user);
    } catch (error) {
        res.status(500).json({message :"server error", error: error.message
        });
    }
};


module.exports = {getUser,getUserById,};