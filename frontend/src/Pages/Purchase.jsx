import { useEffect, useState } from "react";
import axios from "axios";

export default function Purchases() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/v1/user/purchase", {
        headers: { token: token },
      })
      .then((res) => setCourses(res.data.courses))
      .catch(() => alert("Could not load purchases"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Purchases</h2>

      {courses.map((c) => (
        <div className="card mb-4" key={c._id}>
          <h3 className="font-bold">{c.title}</h3>
          <p>{c.description}</p>
        </div>
      ))}
    </div>
  );
}
