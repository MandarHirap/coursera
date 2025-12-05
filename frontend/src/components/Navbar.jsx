import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Course Store</h1>

      <div className="flex gap-6">
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/create-course">Create Course</Link>
        <Link to="/purchases">Purchases</Link>
      </div>
    </nav>
  );
}
