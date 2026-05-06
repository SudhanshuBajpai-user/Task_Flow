const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },

  complete: {
    type: Boolean,
    default: false
  },

  completedAt: Date||null,

  date: Date,

  userId:{type:String,required:true}

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);