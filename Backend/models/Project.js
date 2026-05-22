const mongoose = require("mongoose");

const projectSchema = new mongoose({
  title: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  complete: {
    type: Boolean,
    default: false,
  },
  subtasks: {
    title: { type: String, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
});
