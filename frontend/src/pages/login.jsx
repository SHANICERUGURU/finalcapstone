import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid username or password");
      const data = await res.json();

      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      localStorage.setItem("role", data.role);

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center vh-100 vw-100"
      style={{
        backgroundImage: "url(/assets/Images/home.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      {/* Centered login card */}
      <div className="card shadow-lg p-4 rounded-4 position-relative z-1 w-100" style={{ maxWidth: "420px" }}>
        <h1 className="text-center mb-4 text-primary fw-bold">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-control p-3"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control p-3"
              required
            />
          </div>

          <p className="text-center">
            Not Registered?{" "}
            <Link to="/register" className="fw-semibold text-primary">
              Register
            </Link>
          </p>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
