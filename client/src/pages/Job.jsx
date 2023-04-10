import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";
import { getJob } from "../actions/jobs";

const Job = ({ job: { loading, job }, getJob, auth: { user } }) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      const job = await getJob(id);
    };

    fetchJob();
  }, [getJob, id]);

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <h1>Job Detail</h1>
        <hr />
        {!loading && job && (
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="styled-back">@</div>
              <h3>
                {job?.title} by @{user?.businessname}
              </h3>
              <br />
              <p>{job?.description}</p>
              <p>Salary: {job?.salary} $</p>

              <p>
                Added By: {user?.name} <br />
                Contact Number: {user?.phone} <br />
                Address: {user?.address} <br />
                Last updated: {new Date(`${job?.updatedAt}`).toLocaleString()}
              </p>
            </div>
          </div>
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
  job: state.job,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJob })(Job);
