import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        email,
        password
      });

      alert("Signup successful");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl w-80">

        <h2 className="text-2xl mb-4">Signup</h2>

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

        <button onClick={handleSignup} className="btn-blue w-full">
          Signup
        </button>

      </div>
    </div>
  );
}