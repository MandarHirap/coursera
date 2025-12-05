import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <h2 className="logo">Coursera Clone</h2>

      <div className="links">
        <Link to="/courses">Courses</Link>
        <Link to="/purchases">My Purchases</Link>
        <Link to="/create-course">Create Course</Link>
        <Link to="/signin">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
