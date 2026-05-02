const express=require("express");
const tasksRouter=express.Router();

const taskWay=require('../controller/tasksConfig');
const mailWay=require("../controller/sendVerification")

tasksRouter.post("/",taskWay.postTasks);
tasksRouter.get("/",taskWay.getTasks);
tasksRouter.delete("/:id",taskWay.deleteTasks);
tasksRouter.put("/complete/:id",taskWay.completeTasks);
tasksRouter.put("/edit/:taskId",taskWay.editTasks);
tasksRouter.put("/verify-email",mailWay.sendVerification)

module.exports=tasksRouter;
