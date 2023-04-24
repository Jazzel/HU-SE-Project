import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import { useEffect, useLayoutEffect } from "react";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import EmailCode from "./pages/EmailCode";
import ChangePassword from "./pages/ChangePassword";
import EmailSent from "./pages/EmailSent";
import ConfirmAccount from "./pages/ConfirmAccount";
import AdminRoute from "./routing/AdminRoute";
import UserDashboard from "./pages/UserDashboard";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Job from "./pages/Job";
import CreateProfile from "./pages/CreateProfile";
import AddEducation from "./pages/AddEducation";
import AddExperience from "./pages/AddExperience";
import EditProfile from "./pages/EditProfile";
import Jobs from "./pages/Jobs";
import AppliedJobs from "./pages/AppliedJobs";

export const HOST = "http://localhost:5001";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
const App = () => {
  useEffect(() => {
    let visitorCount = localStorage.getItem("visitorCount");
    localStorage.setItem("visitorCount", ++visitorCount);

    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
          <Routes>
            <Route path="/*">
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="confirm/:email/:code" element={<ConfirmAccount />} />
              <Route path="reset/:email/:code" element={<EmailCode />} />
              <Route path="email-sent/:email" element={<EmailSent />} />
              <Route
                path="change-password/:email/:code"
                element={<ChangePassword />}
              />
              <Route
                path="dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="user-dashboard"
                element={
                  <AdminRoute>
                    <UserDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="create-profile"
                element={
                  <AdminRoute>
                    <CreateProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="edit-profile"
                element={
                  <AdminRoute>
                    <EditProfile />
                  </AdminRoute>
                }
              />
              <Route
                path="add-experience"
                element={
                  <AdminRoute>
                    <AddExperience />
                  </AdminRoute>
                }
              />
              <Route
                path="add-education"
                element={
                  <AdminRoute>
                    <AddEducation />
                  </AdminRoute>
                }
              />
              <Route
                path="job/add"
                element={
                  <AdminRoute>
                    <AddJob />
                  </AdminRoute>
                }
              />
              <Route
                path="job/edit/:id"
                element={
                  <AdminRoute>
                    <EditJob />
                  </AdminRoute>
                }
              />
              <Route
                path="job/:id"
                element={
                  <AdminRoute>
                    <Job />
                  </AdminRoute>
                }
              />
              <Route
                path="applied-jobs"
                element={
                  <AdminRoute>
                    <AppliedJobs />
                  </AdminRoute>
                }
              />
              <Route
                path="jobs"
                element={
                  <AdminRoute>
                    <Jobs />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Wrapper>
      </Router>
    </Provider>
  );
};

export default App;
