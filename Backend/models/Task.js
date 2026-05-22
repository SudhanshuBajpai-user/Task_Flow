const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // Main Task Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional Description
    // description: {
    //   type: String,
    //   default: "",
    // },

    // Priority Level
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    // Task Completion Status
    complete: {
      type: Boolean,
      default: false,
    },

    // Scheduled / Due Date
    date: {
      type: Date,
      required: true,
    },

    // Completion Timestamp
    completedAt: {
      type: Date,
      default: null,
    },

    // User Ownership
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Project Reference
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    // Custom Tags
    tag:{
        type: String,
        trim: true,
      },

    // Recurring Tasks
    // recurring: {
    //   type: String,
    //   enum: ["none", "daily", "weekly", "monthly"],
    //   default: "none",
    // },

    // Drag & Drop Position
    // position: {
    //   type: Number,
    //   default: 0,
    // },

    // Subtasks
    subtasks: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },

        complete: {
          type: Boolean,
          default: false,
        },

        completedAt: {
          type: Date,
          default: null,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);