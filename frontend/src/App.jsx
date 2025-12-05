import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Courses from "./Pages/Courses";
import CreateCourse from "./Pages/CreateCourse";
import Purchases from "./Pages/Purchases";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </BrowserRouter>
  );
}
