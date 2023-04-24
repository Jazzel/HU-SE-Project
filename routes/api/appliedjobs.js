const express = require("express");
const router = express.Router();

const AppliedJob = require("../../models/AppliedJob");
const auth = require("../../middlewares/auth");

// @route   GET api/appliedjobs/:id
// @desc    Get appliedjobs by user id
// @access  Authenticated
router.get("/:id", auth, async (req, res) => {
  try {
    const appliedjobs = await AppliedJob.find({ user: req.params.id });

    if (!appliedjobs)
      return res.status(404).json({ msg: "Applied jobs not found" });

    return res.json(appliedjobs[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route   POST api/appliedjobs
// @desc    Create a appliedjob
// @access  Public
router.post("/", auth, async (req, res) => {
  console.log("dsadsadas");

  const { job, user, description } = req.body;

  try {
    // find applied jobs with the user
    let appliedjob = await AppliedJob.findOne({ user: user });

    if (appliedjob) {
      appliedjob.applied = [{ job, description }, ...appliedjob.applied];
      await appliedjob.save();

      return res.status(200).json(appliedjob);
    } else {
      let newAppliedJob = new AppliedJob({
        user,
        appliedjobs: [{ job, description }],
      });

      await newAppliedJob.save();

      return res.status(200).json(newAppliedJob);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
