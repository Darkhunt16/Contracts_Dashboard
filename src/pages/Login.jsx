import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    const r = login({ username, password });
    if (r.ok) {
      nav("/", { replace: true });
    } else {
      setErr(r.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-sm">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">Use password <strong>test123</strong></p>
          </div>
          {err && <div className="text-sm text-red-600">{err}</div>}
          <button className="w-full py-2 bg-indigo-600 text-white rounded">Login</button>
        </form>
      </div>
    </div>
  );
}
