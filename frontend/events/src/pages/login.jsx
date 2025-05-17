import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            const res = await axios.post("http://localhost:3000/api/login", {email, password});
            localStorage.setItem("token", res.data.token);
            window.location.href = "/"
        } catch(err){
          setError(err.response?.data?.error || "Login failed");
        }
    };
    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          className="border p-2 mb-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );

}