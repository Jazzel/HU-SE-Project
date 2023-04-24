import React, { useEffect } from "react";
import { connect } from "react-redux";
import DashboardHeader from "../Components/DashboardHeader";
import PropTypes from "prop-types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCurrentProfile, deleteAccountAndProfile } from "../actions/profile";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const UserDashboard = ({
  isAuthenticated,
  getCurrentProfile,
  auth: { user, role },
  profile: { profile, loading },
  deleteAccountAndProfile,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== "worker") {
    return navigate("/dashboard");
  }

  return (
    <div>
      <DashboardHeader />
      <section className="container p-5">
        <h1 className="large">Dashboard</h1>
        <p className="lead">
          <i className="fa fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccountAndProfile()}
              >
                <i className="fas fa-user-minus"></i> Delete my account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              You have not yet setup a profile, please add some information.
            </p>
            <Link to="/create-profile" className="btn btn-dark my-1">
              Create profile
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
});

UserDashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccountAndProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccountAndProfile,
})(UserDashboard);
