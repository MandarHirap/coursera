import { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/course/preview")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <div className="container">
      <h1>Courses</h1>
      {courses.map((c) => (
        <div key={c._id} className="card">
          <h2>{c.title}</h2>
          <p>{c.description}</p>
          <p>Price: {c.price}</p>
        </div>
      ))}
    </div>
  );
}
