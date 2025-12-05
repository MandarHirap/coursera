import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Courses from "./Pages/Courses";
import Purchase from "./Pages/Purchase";
import CreateCourse from "./Pages/CreateCourse";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
