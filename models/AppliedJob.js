const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppliedJobSchema = new Schema({
  user: {
    type: String,
    ref: "users",
  },

  applied: [
    {
      job: {
        type: String,
        ref: "jobs",
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("applied-jobs", AppliedJobSchema);
