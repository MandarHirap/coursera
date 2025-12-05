import { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/course/preview")
      .then((res) => setCourses(res.data.courses))
      .catch(() => alert("Error loading courses"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Available Courses</h2>

      <div className="grid grid-cols-3 gap-6">
        {courses.map((c) => (
          <div className="card" key={c._id}>
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p>{c.description}</p>
            <p className="text-purple-400 font-semibold">₹{c.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
