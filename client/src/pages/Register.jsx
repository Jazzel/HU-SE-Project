import React, { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register, login } from "../actions/auth";
import Alert from "../Components/Alert";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";

const Register = ({ register, isAuthenticated, setAlert }) => {
  const [name, setName] = React.useState("");
  const [_role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [businessname, setBusinessname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [width, setWidth] = React.useState("500px");
  const [hidden, setHidden] = React.useState("hidden");

  const [col, setCol] = React.useState("col-12");

  const dropdown = useRef();
  const navigate = useNavigate();

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" />;
  // }

  const showMoreFields = () => {
    if (dropdown.current.value === "company") {
      setRole("company");
      setCol("col-6");
      setHidden("show");
      setWidth("80%");
    } else {
      setRole("worker");
      setWidth("500px");
      setCol("col-12");
      setHidden("hidden");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const role = dropdown.current.value || "worker";
    console.log(e.target.value, role, _role);

    let response;
    if (_role === "company") {
      if (!businessname || !address || !phone) {
        setAlert("Please fill all fields", "danger");
      } else {
        response = await register({
          name,
          email,
          password,
          role,
          businessname,
          address,
          phone,
        });
      }
    } else {
      response = await register({ name, email, password, role });
    }

    console.log(response);
    if (response === 200) {
      navigate(`/email-sent/${email}`);
    }
  };

  return (
    <div className="row" style={{ height: "100vh" }}>
      <div
        className="col-xs-12 col-sm-12 col-md-6 col-md-6 col-lg-6 col-xl-6 bg-danger"
        style={{
          backgroundImage: `url(${require("./../assets/login-banner.webp")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="shadow-lg col-xs-12 col-sm-12 col-md-6 col-md-6 col-lg-6 col-xl-6"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: width,
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <div>
            <h1 className="text-center styled-font">BizzHome</h1>
          </div>
          <h1 className="text-center mt-2  text-dark" style={{}}>
            Register
          </h1>

          <br />
          <div
            className={`col-12 `}
            style={{
              justifyContent: "center",
              display: "flex",
              borderRadius: "5px",
              flexDirection: "column",
            }}
          >
            <form
              className={`form m-auto`}
              autoComplete="false"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="row px-5">
                <Alert style={{ width: "80%" }} />
              </div>
              <div className="row p-4">
                <div className={`${col}`}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      ab
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      autoComplete="false"
                      onChange={(e) => setName(e.target.value)}
                      aria-label="name"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      autoComplete="false"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="email"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      **
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="Password"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      {"&"}
                    </span>
                    <select
                      className="form-control"
                      value={_role}
                      ref={dropdown}
                      onChange={(e) => {
                        setRole(e.target.value);
                        showMoreFields();
                      }}
                    >
                      <option value="worker">Worker</option>
                      <option value="company">Company Owner</option>
                    </select>
                  </div>
                </div>
                <div className={`${col} ${hidden}`}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      ab
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Business Name"
                      autoComplete="false"
                      value={businessname}
                      onChange={(e) => setBusinessname(e.target.value)}
                      aria-label="businessname"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      ab
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      autoComplete="false"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      aria-label="address"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      12
                    </span>
                    <input
                      type="number"
                      minLength={13}
                      className="form-control"
                      placeholder="Phone Number"
                      autoComplete="false"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-label="phone"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-dark w-100">
                    Register
                  </button>
                </div>
                <br />
                <div className="text-center">
                  Already a user?{" "}
                  <Link className="text-dark" to="/login">
                    Login here.
                  </Link>
                </div>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  setAlert: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
