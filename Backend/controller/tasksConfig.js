const Task = require("../models/Task")
const postTasks = async (req, res) => {
  try {
    const { title, priority, date } = req.body;

    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await Task.create({
      title,
      priority,
      date,
      complete: false,
      userId: req.session.userId,
    });

    res.status(201).json(task);

  } catch (err) {
    console.error("POST TASK ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.session.userId;

    const allTasks = await Task.find({ userId });

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: allTasks,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const completeTasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.complete = !task.complete;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports={postTasks, getTasks, deleteTasks, completeTasks}