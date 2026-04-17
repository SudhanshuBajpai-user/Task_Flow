const express=require("express");
const tasksRouter=express.Router();

const taskWay=require('../controller/tasksConfig');


tasksRouter.post("/",taskWay.postTasks);
tasksRouter.get("/",taskWay.getTasks);
tasksRouter.delete("/:id",taskWay.deleteTasks);
tasksRouter.put("/complete/:id",taskWay.completeTasks);


module.exports=tasksRouter;
