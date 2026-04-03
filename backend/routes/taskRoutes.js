const express = require("express");
const {protect, adminOnly} = require("../middleware/authMiddleware");
const { getDashboardData, getUserDashboardData, getTask, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskCheckList } = require("../controller/taskController");

const router = express.Router();

//task mangement routes

router.get("/dashboard-data",protect,getDashboardData);
router.get("/user-dashboard-data",protect,getUserDashboardData);
router.get("/",protect,getTask);
router.get("/:id",protect,getTaskById);
router.post("/",protect,adminOnly,createTask);
router.put("/:id",protect,updateTask);
router.delete("/:id",protect,deleteTask);
router.put("/:id/status",protect,updateTaskStatus);
router.put("/:id/",protect,updateTaskCheckList);

module.exports = router;

