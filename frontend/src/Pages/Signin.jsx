import { useState } from "react";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const res = await fetch("http://localhost:3000/api/v1/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Signin success");
    } else {
      alert("Error");
    }
  }

  return (
    <div className="container">
      <h1>Sign In</h1>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
