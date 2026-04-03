const Task = require("../models/Task");

//@desc      get all tasks("admin:all,user:only assigned task")
//@route     get/api/tasks
//@access    private
const getTask = async (req,res) => {
    try {
        const {status} = req.query;
        let filter = {};

        if (status) {
         filter.status = status;   
        }

        let tasks;

        if(req.user.role === "admin"){
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }else{
            tasks = await Task.find({...filter,assignedTo: req.user._id}).populate(
                "assignedTo",
                "name email profileImageUrl"
            )
        }

        //add completed todochecklist to count each task
        tasks =await Promise.all(
            tasks.map(async (task) => {
                const completedCount = task.todoChecklist.filter(
                    (item) => item.completed
                ).length;
                return {...task._doc,completedTodoCount: completedCount};
            })
        );

        //status summary count
        const allTasks = await Task.countDocuments(
        req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status:"Pending",
            ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
        });

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status:"In Progress",
            ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
        });

        const compltedTasks = await Task.countDocuments({
            ...filter,
            status:"Completed",
            ...(req.user.role !== "admin" && {assignedTo: req.user._id}),
        });

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                compltedTasks,
            },
        });
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

//@desc      get task by id
//@route     get/api/tasks/:id
//@access    private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of user IDs" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@desc      delete task(admin only)
//@route     delete/api/tasks/:id
//@access    private(admin)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@desc      update task status
//@route     put/api/tasks/:id/status
//@access    private
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
      task.todoChecklist.forEach((item) => (item.completed = true));
      task.progress = 100;
    }

    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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


