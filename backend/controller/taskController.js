const Task = require("../models/Task");

//@desc      get all tasks("admin:all,user:only assigned task")
//@route     get/api/tasks
//@access    private
const getTask = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      get task by id
//@route     get/api/tasks/:id
//@access    private
const getTaskById = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      create task(admin only)
//@route     post/api/tasks
//@access    private(admin only)
const createTask = async (req,res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoCheckList,
        }= req.body;

        if(!Array.isArray(assignedTo)) {
            return res
            .status(400)
            .json({message: "assigedTo must be an array of user Id's"});
        }

        const task =await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoCheckList,
            createdBy: req.user._id,
        });
        res.status(201).json({message: "Task created taskfully",task});
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      update task details
//@route     put/api/tasks/:id
//@access    private
const updateTask = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      delete task(admin only)
//@route     delete/api/tasks/:id
//@access    private(admin)
const deleteTask = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      update task status
//@route     put/api/tasks/:id/status
//@access    private
const updateTaskStatus = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      update task checklist
//@route     put/api/tasks/:id/status
//@access    private
const updateTaskCheckList = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      getDashboardData
//@route     get/api/tasks/Dashboard-Data
//@access    private
const getDashboardData = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};


//@desc      get user Dashboard Data
//@route     get/api/tasks/user-Dashboard-Data
//@access    private
const getUserDashboardData = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

module.exports ={
    getTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskCheckList,
    getDashboardData,
    getUserDashboardData
}


