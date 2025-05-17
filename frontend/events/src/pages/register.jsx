import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form, setForm] = useState("");
    const [error,setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("")
        try {
            await axios.post("http://localhost:3000/api/register", form);
            setSuccess("Registration successful! You can now log in.");
        } catch(err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Register</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 mb-2 w-full"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">
          Register
        </button>
      </form>
    </div>
  );

}