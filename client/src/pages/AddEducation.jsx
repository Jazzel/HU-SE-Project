import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../actions/profile";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const navigate = useNavigate();

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const response = addEducation(formData, history);

    if (response) {
      navigate("/user-dashboard");
    }
  };

  return (
    <>
      <DashboardHeader />
      <section className="container p-5">
        <h1 class="large text-dark">Add An Education</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any school/bootcamp that you
          have attended
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={(e) => onSubmit(e)}>
          <div class="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              className="form-control mt-2"
              required
              value={school}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              className="form-control mt-2"
              required
              value={degree}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Field of Study"
              name="fieldofstudy"
              value={fieldofstudy}
              className="form-control mt-2"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              className="form-control mt-2"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                checked={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{" "}
              Current program
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              className="form-control mt-2"
              name="to"
              value={to}
              disabled={toDateDisabled ? "disabled" : ""}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              className="form-control mt-2"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
          <a class="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </section>
      <Footer />
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
