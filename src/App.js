import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { database } from "./firebase";
import Home from "./pages/Home";
import FourOFour from "./pages/FourOFour";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </Router>
  );
};

export default App;
