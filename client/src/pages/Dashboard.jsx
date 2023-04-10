import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import { deactivateUser, logout } from "../actions/auth";
import { getJobs, removeJob } from "../actions/jobs";

const Dashboard = ({
  auth: { role, username, users, status },
  job: { loading, jobs },
  getJobs,
  removeJob,
  logout,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  if (status === "Blocked") {
    navigate("/login");
    logout();
  }

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <Alert />
        {role === "company" && (
          <>
            <div className="row">
              <div className="col-10">
                <h1>Jobs</h1>
              </div>
              <div className="col-2">
                <Link to={"/job/add"} className={"w-100 btn btn-dark"}>
                  + Add Job
                </Link>
              </div>
            </div>

            <table className="table table-striped">
              <thead className="thead-dark ">
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs && role === "company" && jobs.length > 0 ? (
                  jobs.map(({ _id, title, location, salary, status }) => (
                    <tr key={_id}>
                      <td scope="row">{title}</td>
                      <td>{location}</td>
                      <td>{salary}</td>
                      <td>{status}</td>
                      <td>
                        <Link
                          to={`/job/${_id}`}
                          className={" btn btn-dark"}
                          style={{ marginRight: "5px" }}
                        >
                          View
                        </Link>
                        <button
                          className=" btn btn-danger"
                          onClick={() => removeJob(_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  //   .map(<></>)
                  // <></>
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No jobs found !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  job: state.job,
});

Dashboard.propTypes = {
  getJobs: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  logout,
  getJobs,
  removeJob,
})(Dashboard);
