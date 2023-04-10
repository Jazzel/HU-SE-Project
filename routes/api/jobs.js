const Job = require("../../models/Jobs");

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/jobs
// @desc    Create a job
// @access  Public
router.post("/", async (req, res) => {
  const { title, description, location, salary, status, addedBy } = req.body;

  try {
    let job = new Job({
      title,
      description,
      location,
      salary,
      status,
      addedBy,
    });

    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Public
router.put("/:id", async (req, res) => {
  const { title, description, location, salary, status, addedBy } = req.body;

  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, location, salary, status, addedBy } },
      { new: true }
    );

    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    await Job.findByIdAndRemove(req.params.id);

    res.json({ msg: "Job removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
