import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginStudent } from "../services/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const user = await loginStudent({ email, password });

      console.log("Logged user:", user);

      /* SAVE FULL USER OBJECT */
      localStorage.setItem("user", JSON.stringify(user));

      /* REDIRECT BASED ON ROLE */
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/student", { replace: true });
      }

    } catch (err) {

      console.error(err);
      alert("Invalid email or password");

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="center">

    <div className="hero-card" style={{ width: 420 }}>

      {/* LOGO */}
      <div style={{ textAlign: "center", marginBottom: 25 }}>
        <div className="logo-circle">💼</div>
        <h2 style={{ marginBottom: 4 }}>Work-Study</h2>
        <small style={{ opacity: .6 }}>Management System</small>
      </div>

      <p style={{ textAlign: "center", opacity: .6 }}>
        Login to your work-study account
      </p>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ width: "100%", marginTop: 15 }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ textAlign: "center", marginTop: 15 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>

  </div>
);
}
