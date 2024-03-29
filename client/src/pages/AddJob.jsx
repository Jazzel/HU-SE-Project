import React from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { addJob } from "../actions/jobs";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const AddJob = ({ addJob, setAlert, auth: { user, role } }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState();
  const [salary, setSalary] = React.useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && description !== "" && salary > 0 && location !== "") {
      const formData = {
        title,
        description,
        addedBy: user?._id,
        location,
        salary,
      };

      console.log(formData);

      const response = await addJob(formData);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } else {
      setAlert("All fields are required", "danger");
    }
  };

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <form onSubmit={handleSubmit}>
          <h1>Add Job</h1>
          <br />

          <Alert />
          <div class="form-group w-50">
            <label for="">Name:</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Name of the service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Salary:</label>
            <input
              type="number"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Salary for the service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Description:</label>
            <textarea
              type="text"
              class="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <small id="helpId" class="form-text text-muted">
              Brief description of your service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Location:</label>
            <textarea
              type="text"
              class="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></textarea>
            <small id="helpId" class="form-text text-muted">
              Location of the job.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <button className="btn btn-primary w-100" type="submit">
              Add Job
            </button>
          </div>
        </form>
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
});

export default connect(mapStateToProps, {
  addJob,
  setAlert,
})(AddJob);
