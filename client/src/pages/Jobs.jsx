import React, { useEffect, useState } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../actions/jobs";
import { connect } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { applyForJob, getAppliedJobs } from "../actions/appliedJobs";
import { setAlert } from "../actions/alert";

const Jobs = ({
  job: { loading, jobs },
  getJobs,
  auth: { user },
  appliedjob: { appliedjobs },
  applyForJob,
  setAlert,
  getAppliedJobs,
}) => {
  useEffect(() => {
    getJobs();
    getAppliedJobs();
  }, [getJobs, getAppliedJobs]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [description, setDescription] = useState("");

  const applyJob = (job) => {
    if (user && job) {
      setSelectedJob(job);
      // handleShow();
      toggle();
    }
  };

  const handleSubmit = async () => {
    const form = { job: selectedJob._id, user: user._id, description };

    const response = await applyForJob(form);

    console.log(response);
    if (response.status === 200) {
      toggle();
    } else {
      setAlert("Something went wrong", "danger");
    }
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <DashboardHeader />
      <section className="container p-5">
        <h1>Trending Jobs</h1>
        <hr />
        {!loading &&
          jobs &&
          jobs.length > 0 &&
          jobs
            .filter((job) => job.status === "UnAssigned")
            .map((job) => (
              <div className="card mb-3" key={job._id}>
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">{job.description}</p>
                  <p className="card-text">Expected Salary: {job.salary}</p>
                  <p className="card-text">Location: {job.location}</p>
                  <p className="card-text">Status: Hiring</p>
                  {appliedjobs && (
                    <button
                      className="btn btn-dark"
                      onClick={() => applyJob(job)}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            ))}
      </section>
      <Footer />

      {/* <button type="button" className="btn btn-primary btn-lg">
        Launch
      </button> */}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Application form</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <form>
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Why are you interested in this job?"
              ></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={handleSubmit}>
            Submit
          </Button>{" "}
          <Button color="light" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  job: state.job,
  auth: state.auth,
  appliedjob: state.appliedjob,
});

export default connect(mapStateToProps, {
  getJobs,
  applyForJob,
  setAlert,
  getAppliedJobs,
})(Jobs);
