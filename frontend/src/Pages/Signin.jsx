import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSignin() {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Signin success!");
    } catch {
      alert("Signin failed");
    }
  }

  return (
    <div className="card max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signin</h2>

      <input
        placeholder="Email"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleSignin} className="w-full">
        Login
      </button>
    </div>
  );
}
