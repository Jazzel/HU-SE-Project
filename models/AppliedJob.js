const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppliedJobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  applied: [
    {
      job: {
        type: Schema.Types.ObjectId,
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
