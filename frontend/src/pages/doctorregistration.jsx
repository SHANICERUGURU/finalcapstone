import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

const DoctorRegistration = () => {
    const [formData, setFormData] = useState({
        specialty: "",
        hospital: "",
        license_number: "",
    });

    const [errors, setErrors] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const specialtyOptions = [
        { value: "GENERALDOCTOR", label: "General Doctor" },
        { value: "DENTIST", label: "Dentist" },
        { value: "ONCOLOGIST", label: "Oncologist" },
        { value: "ortho", label: "Orthopaedic" },
        { value: "OPTICIAN", label: "Optician" },
        { value: "PAEDIATRICIAN", label: "Paediatrician" },
        { value: "cardio", label: "Cardiologist" }
    ];

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessages([]);
        setLoading(true);

        try {
            // Get JWT access token
            const token = localStorage.getItem('access');

            if (!token) {
                setMessages([{ type: "danger", text: "Authentication token missing. Please log in again." }]);
                setLoading(false);
                return;
            }

            const response = await fetch("http://127.0.0.1:8000/api/profiles/doctor/setup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages([{ type: "success", text: "Doctor profile created successfully! Redirecting to dashboard..." }]);

                // Clear form
                setFormData({
                    specialty: "",
                    hospital: "",
                    license_number: "",
                });

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                // Collect Django validation errors
                setErrors(data);
                if (data.detail) {
                    setMessages([{ type: "danger", text: data.detail }]);
                } else {
                    setMessages([{ type: "danger", text: "Please correct the errors below." }]);
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
            setMessages([{ type: "danger", text: "Network error. Please check your connection and try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "#f8f9fa",
                width: "100vw",
                minHeight: "100vh",
            }}
        >
            <div className="w-100 d-flex justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 w-100">
                        <div className="card-header bg-info text-white text-center py-4">
                            <h2 className="mb-0">Doctor Profile Setup</h2>
                            <p className="mb-0 mt-2">Complete your professional information</p>
                        </div>
                        <div className="card-body p-5">

                            {/* Flash Messages */}
                            {messages.map((msg, index) => (
                                <div key={index} className={`alert alert-${msg.type} alert-dismissible fade show`}>
                                    {msg.text}
                                    <button type="button" className="btn-close" onClick={() => setMessages([])}></button>
                                </div>
                            ))}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Specialty - Changed to dropdown */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="specialty" className="form-label">
                                            Specialty *
                                        </label>
                                        <select
                                            id="specialty"
                                            name="specialty"
                                            className={`form-control ${errors.specialty ? 'is-invalid' : ''}`}
                                            value={formData.specialty}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Specialty</option>
                                            {specialtyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.specialty && (
                                            <div className="invalid-feedback">{errors.specialty.join(" ")}</div>
                                        )}
                                    </div>

                                    {/* Hospital */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="hospital" className="form-label">
                                            Hospital/Clinic *
                                        </label>
                                        <input
                                            type="text"
                                            id="hospital"
                                            name="hospital"
                                            className={`form-control ${errors.hospital ? 'is-invalid' : ''}`}
                                            value={formData.hospital}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.hospital && (
                                            <div className="invalid-feedback">{errors.hospital.join(" ")}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    {/* License Number */}
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="license_number" className="form-label">
                                            License Number *
                                        </label>
                                        <input
                                            type="text"
                                            id="license_number"
                                            name="license_number"
                                            className={`form-control ${errors.license_number ? 'is-invalid' : ''}`}
                                            value={formData.license_number}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.license_number && (
                                            <div className="invalid-feedback">{errors.license_number.join(" ")}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-info btn-lg px-4"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creating Profile...
                                            </>
                                        ) : (
                                            "Create Doctor Profile"
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg px-4"
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Back to Dashboard
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <small className="text-muted">
                                        * Required fields. Your profile information will be visible to patients.
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorRegistration;