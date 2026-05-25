const Task = require("../models/Task");
const postTasks = async (req, res) => {
  try {
    const { title, priority, date } = req.body;
    if (!title || !priority) {
      return res.status(400).json({ message: "Invalid input" });
    }
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const task = await Task.create({
      title,
      priority,
      date: date || new Date().toISOString().split("T")[0],
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
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });
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
    task.completedAt = task.complete ? new Date() : null;

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

const editTasks = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, priority, date } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: taskId, userId: req.session.userId },
      {
        title,
        priority,
        date: date || new Date().toISOString().split("T")[0],
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const addSubTasks = async (req, res) => {
  console.log("ADD SUBTASK HIT");

  try {
    const { taskId, title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Subtask title required",
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },

      {
        $push: {
          subtasks: {
            title,
          },
        },
      },

      {
        returnDocument: "after",
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const completeSubtasks = async (req, res) => {
  try {
    const { taskId, subTaskId } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const subtask = task.subtasks.find(
      (sub) => sub._id.toString() === subTaskId,
    );

    if (!subtask) {
      return res.status(404).json({
        message: "Subtask not found",
      });
    }

    subtask.complete = !subtask.complete;

    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  postTasks,
  getTasks,
  deleteTasks,
  completeTasks,
  editTasks,
  addSubTasks,
  completeSubtasks,
};
