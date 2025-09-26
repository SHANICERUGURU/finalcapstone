import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        role: "PATIENT",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    gender: formData.gender,
                    date_of_birth: formData.dateOfBirth,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                    role: formData.role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle validation errors from Django
                if (data.errors) {
                    // If there are field-specific errors
                    const errorMessages = Object.values(data.errors).flat().join(', ');
                    setErrorMessage(errorMessages);
                } else if (data.detail) {
                    setErrorMessage(data.detail);
                } else {
                    setErrorMessage(JSON.stringify(data));
                }
                return;
            }
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage("An error occurred during registration. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="position-relative d-flex justify-content-center align-items-center min-vh-100 vw-100"
            style={{
                backgroundImage: "url(/assets/Images/home.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            {/* Centered register card */}
            <div
                className="card shadow-lg rounded-4 position-relative z-1 w-100"
                style={{ maxWidth: "900px" }}
            >
                <div className="card-body p-4 p-md-5" style={{ height: "auto" }}>
                    <div className="text-center mb-5">
                        <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle p-4 mb-3">
                            <i className="bi bi-person-plus-fill text-white fs-1"></i>
                        </div>
                        <h1 className="display-5 fw-bold text-primary mb-2">Create Your Account</h1>
                        <p className="lead text-muted">
                            Join our healthcare platform and take control of your health journey
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            <div>{errorMessage}</div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Left side */}
                            <div className="col-md-6">
                                <h5 className="text-primary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-person me-2"></i>
                                    Personal Information
                                </h5>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName" className="form-label fw-semibold">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            placeholder="John"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label fw-semibold">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-semibold">
                                        Username *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="johndoe123"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john.doe@example.com"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label fw-semibold">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="col-md-6">
                                <h5 className="text-primary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-shield-lock me-2"></i>
                                    Account Details
                                </h5>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="gender" className="form-label fw-semibold">
                                            Gender
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="dateOfBirth" className="form-label fw-semibold">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control form-control-lg"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label fw-semibold">
                                        I am registering as *
                                    </label>
                                    <div className="d-grid gap-2">
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                className={`btn btn-lg ${formData.role === "PATIENT" ? "btn-primary" : "btn-outline-primary"
                                                    }`}
                                                onClick={() => setFormData({ ...formData, role: "PATIENT" })}
                                            >
                                                <i className="bi bi-heart-pulse me-2"></i>
                                                Patient
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn btn-lg ${formData.role === "DOCTOR" ? "btn-info" : "btn-outline-info"
                                                    }`}
                                                onClick={() => setFormData({ ...formData, role: "DOCTOR" })}
                                            >
                                                <i className="bi bi-briefcase me-2"></i>
                                                Doctor
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Create a strong password"
                                    />
                                    <div className="form-text">
                                        Use 8+ characters with a mix of letters, numbers & symbols
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirm your password"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg py-3 fw-bold fs-5"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Creating Your Account...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-person-plus me-2"></i>
                                                Create My Account
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-4 pt-3 border-top">
                            <p className="text-muted mb-0">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary text-decoration-none fw-semibold">
                                    Sign in to your account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;