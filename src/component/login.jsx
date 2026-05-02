import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password
      });

      alert("Login successful");
      console.log(res.data);

      // store token
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dsa";

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl w-80">

        <h2 className="text-2xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mb-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn-green w-full">
          Login
        </button>

      </div>
    </div>
  );
}