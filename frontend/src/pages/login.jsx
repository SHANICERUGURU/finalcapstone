import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN} from "../constants";

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.detail || "Invalid username or password");
            }
            localStorage.setItem(ACCESS_TOKEN, data.access);
            localStorage.setItem(REFRESH_TOKEN, data.refresh);
            if (data.role){
                localStorage.setItem("role", data.role);
            }
            setIsLoggedIn(true);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "An error occurred during login. Please try again.");
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
            <div
                className="card shadow-lg p-4 rounded-4 position-relative z-1 w-100"
                style={{ maxWidth: "420px" }}
            >
                <h1 className="text-center mb-4 text-primary fw-bold">Login</h1>

                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setError("")}
                        ></button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-semibold">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="form-control p-3"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="form-control p-3"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fw-semibold mb-3"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <p className="text-center mb-0">
                        Not Registered?{" "}
                        <Link to="/register" className="fw-semibold text-primary text-decoration-none">
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;