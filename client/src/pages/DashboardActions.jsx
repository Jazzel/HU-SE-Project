import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <>
      <div className="dash-buttons">
        <Link
          to="/edit-profile"
          className="btn btn-dark"
          style={{ marginRight: "10px" }}
        >
          <i className="fas fa-user-circle text-light"></i> Edit Profile
        </Link>
        <Link
          to="/add-experience"
          style={{ marginRight: "10px" }}
          className="btn btn-dark"
        >
          <i className="fab fa-black-tie text-light"></i> Add Experience
        </Link>
        <Link
          style={{ marginRight: "10px" }}
          to="/add-education"
          className="btn btn-dark"
        >
          <i className="fas fa-graduation-cap text-light"></i> Add Education
        </Link>
      </div>
    </>
  );
};

export default DashboardActions;
