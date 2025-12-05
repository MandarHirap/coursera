import { useState } from "react";
import axios from "axios";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  async function create() {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.post("http://localhost:3000/api/v1/admin/course", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Course created!");
    } catch {
      alert("Error creating course");
    }
  }

  return (
    <div className="card max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>

      <input
        placeholder="Title"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Image URL"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />

      <input
        placeholder="Price"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={create} className="w-full">
        Create
      </button>
    </div>
  );
}
