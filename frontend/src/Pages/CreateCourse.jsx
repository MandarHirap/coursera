import { useState } from "react";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const res = await fetch("http://localhost:3000/api/v1/admin/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <div className="container">
      <h1>Create Course</h1>

      <input name="title" placeholder="Course Title" onChange={handleChange} />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
