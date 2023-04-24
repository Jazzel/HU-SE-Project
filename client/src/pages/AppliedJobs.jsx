import React, { useEffect, useState } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getJob, getJobs } from "../actions/jobs";
import { connect } from "react-redux";

import { getAppliedJobs } from "../actions/appliedJobs";
import { setAlert } from "../actions/alert";

const AppliedJobs = ({
  auth: { user },
  appliedjob: { loading, appliedjobs },
  job: { jobs },
  getAppliedJobs,
}) => {
  useEffect(() => {
    getJobs();
    if (user) {
      getAppliedJobs(user._id);
    }
  }, [getJobs, getAppliedJobs, user]);

  const find = (_job) => {
    return jobs.find((job) => job._id === _job);
  };

  return (
    <div>
      <DashboardHeader />
      <section className="container p-5">
        <div className="row">
          <div className="col-md-6">
            <h1>Applied Jobs</h1>
          </div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link to="/jobs" className="btn btn-dark float-right">
              Show trending jobs
            </Link>
          </div>
        </div>
        <hr />
        {!loading &&
          appliedjobs &&
          appliedjobs.applied &&
          appliedjobs.applied.length > 0 &&
          appliedjobs.applied.map((appliedjob) => {
            const job = find(appliedjob.job);
            return (
              <div className="card shadow mt-3">
                <div className="card-body p-5">
                  <div className="styled-back">@</div>
                  <h3>
                    {job?.title} by @{user?.businessname} in {job?.location}
                  </h3>
                  <br />
                  <p>{job?.description}</p>
                  <p>Salary: {job?.salary} $</p>

                  <p>
                    Added By: {user?.name} <br />
                    Contact Number: {user?.phone} <br />
                    Address: {user?.address} <br />
                    Last updated:{" "}
                    {new Date(`${job?.updatedAt}`).toLocaleString()}
                  </p>
                  <small
                    className="bg-warning text-light"
                    style={{
                      borderRadius: 5,
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    Status: <span className="">Pending</span>
                  </small>
                </div>
              </div>
            );
          })}
      </section>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appliedjob: state.appliedjob,
  job: state.job,
});

export default connect(mapStateToProps, {
  setAlert,
  getJobs,
  getAppliedJobs,
})(AppliedJobs);
