import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Header = ({ isAuthenticated, auth: { role }, logout }) => {
  return (
    <header className="container">
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1 className="text styled-font">BizzHome</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2  mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/insurances">
                  Insurances
                </Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
            </ul>
            <span className="navbar-text">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {role === "company" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link">
                        Visitor Count:{" "}
                        {localStorage.getItem("visitorCount") || 0}
                      </a>
                    </li>
                  </>
                )}
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" onClick={logout} href="#!">
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
