import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import { getUsers, deactivateUser, logout } from "../actions/auth";

const Dashboard = ({
  auth: { role, username, users, status },
  deactivateUser,
  deleteBusiness,
  getUsers,
  isAuthenticated,
  logout,
}) => {
  const navigate = useNavigate();

  const [getAllServices, setGetAllServices] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      getUsers();
    }
  }, [getUsers, role]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role === "user") {
    return <Navigate to="/user-dashboard" />;
  }

  if (status === "Blocked") {
    navigate("/login");
    logout();
  }

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <Alert />
        {role === "admin" && (
          <>
            <div className="row">
              <div className="col-12">
                <h1>Users</h1>
              </div>
            </div>

            <table className="table table-striped">
              <thead className="thead-dark ">
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && role === "admin" && users.length > 0 ? (
                  users
                    .filter((user) => user.role !== "admin")
                    .map(({ _id, name, role, status }) => (
                      <tr key={_id}>
                        <td scope="row">{name}</td>
                        <td>{role}</td>
                        <td>{status}</td>
                        <td>
                          {status !== "Pending" && (
                            <button
                              className="btn btn-danger"
                              onClick={() => deactivateUser(_id)}
                            >
                              {status === "Active" ? "Deactivate" : "Activate"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                ) : (
                  //   .map(<></>)
                  // <></>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      No users found !
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
  isAuthenticated: state.auth.isAuthenticated,
});

Dashboard.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, {
  getUsers,
  deactivateUser,
  logout,
})(Dashboard);
