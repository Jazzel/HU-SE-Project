const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["UnAssigned", "Assigned", "Pending", "Active", "Blocked"],
      default: "UnAssigned",
    },
    addedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Job = mongoose.model("jobs", JobSchema);
