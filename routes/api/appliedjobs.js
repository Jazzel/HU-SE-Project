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
    res.json(appliedjobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/appliedjobs
// @desc    Create a appliedjob
// @access  Public
router.post("/", auth, async (req, res) => {
  const { job, user, description } = req.body;

  try {
    let appliedjob = new AppliedJob({
      job,
      user,
      description,
    });

    await appliedjob.save();

    res.json(appliedjob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
