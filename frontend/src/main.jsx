import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Courses from "./Pages/Courses.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/courses" element={<Courses />} />
    </Routes>
  </BrowserRouter>
);
