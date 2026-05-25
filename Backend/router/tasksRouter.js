const express=require("express");
const tasksRouter=express.Router();

const taskWay=require('../controller/tasksConfig');
console.log("TASKS ROUTER FILE");
tasksRouter.post("/",taskWay.postTasks);
tasksRouter.get("/",taskWay.getTasks);
tasksRouter.delete("/:id",taskWay.deleteTasks);
tasksRouter.put("/complete/:id",taskWay.completeTasks);
tasksRouter.put("/edit/:taskId",taskWay.editTasks);
tasksRouter.put("/addSubTasks",taskWay.addSubTasks)
tasksRouter.put("/completeSubTasks",taskWay.completeSubtasks)

module.exports=tasksRouter;
