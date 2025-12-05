import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  async function handleSignup() {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        form
      );
      alert("Signup success!");
    } catch (err) {
      alert("Signup error");
    }
  }

  return (
    <div className="card max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <input
        placeholder="First Name"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />

      <input
        placeholder="Last Name"
        className="w-full mb-3"
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

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

      <button onClick={handleSignup} className="w-full">
        Create Account
      </button>
    </div>
  );
}
