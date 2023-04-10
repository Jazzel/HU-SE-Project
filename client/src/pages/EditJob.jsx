import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../actions/alert";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

import { getJob, updateJob } from "../actions/jobs";

const EditJob = ({ updateJob, getJob, setAlert, auth: { user } }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState();
  const [salary, setSalary] = React.useState();
  const [status, setStatus] = React.useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      const job = await getJob(id);
      setTitle(job.title);
      setDescription(job.description);
      setLocation(job.location);
      setSalary(job.salary);
      setStatus(job.status);
    };

    fetchJob();
  }, [getJob, id]);

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
        status,
      };

      const response = await updateJob(id, formData);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } else {
      setAlert("All field are required", "danger");
    }
  };

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <form onSubmit={handleSubmit}>
          <h1>Update Job</h1>
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
              Update Job
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
  updateJob,
  setAlert,
  getJob,
})(EditJob);
