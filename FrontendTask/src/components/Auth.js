import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../features/auth/authSlice";

export default function Auth() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "register") {
      dispatch(registerUser(form));
    } else {
      dispatch(loginUser({ email: form.email, password: form.password }));
    }
  };

  return (
    <div style={{ width: 300, margin: "50px auto" }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <button onClick={() => setMode("login")}>Login</button>
      <button onClick={() => setMode("register")}>Register</button>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {mode === "register" && (
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
