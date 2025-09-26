import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [roleMismatch, setRoleMismatch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProfileSetup, setShowProfileSetup] = useState(false);
    const navigate = useNavigate();

    const refreshAccessToken = async () => {
        try {
            const refresh = localStorage.getItem(REFRESH_TOKEN);
            if (!refresh) return false;

            const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            });

            if (!res.ok) return false;

            const data = await res.json();
            localStorage.setItem(ACCESS_TOKEN, data.access);
            return true;
        } catch (err) {
            console.error("Failed to refresh token:", err);
            return false;
        }
    };

    const fetchDashboardData = async () => {
        try {
            setError(null);
            let token = localStorage.getItem(ACCESS_TOKEN);

            if (!token) {
                navigate("/login");
                return;
            }

            let response = await fetch("http://127.0.0.1:8000/dashboard/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 401) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    token = localStorage.getItem(ACCESS_TOKEN);
                    response = await fetch("http://127.0.0.1:8000/dashboard/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                } else {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    navigate("/login");
                    return;
                }
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch dashboard data: ${response.status}`);
            }

            const data = await response.json();
            setUser(data.user);
            setPatient(data.patient || null);
            setDoctor(data.doctor || null);
            setRoleMismatch(data.role_mismatch || false);

            if (!data.patient && !data.doctor && !data.role_mismatch) {
                setShowProfileSetup(true);
            } else {
                setShowProfileSetup(false);
            }
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();

        const handleProfileCreated = () => {
            fetchDashboardData();
        };

        window.addEventListener("profileCreated", handleProfileCreated);
        return () => {
            window.removeEventListener("profileCreated", handleProfileCreated);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/login");
    };

    const handleProfileSetup = (type) => {
        if (type === "patient") {
            navigate("/profile-setup");
        } else {
            navigate("/doctor-profile-setup");
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Setting up your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem' }}>
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Oops! Something went wrong</h4>
                    <p>{error}</p>
                    <hr />
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                        <button className="btn btn-outline-secondary" onClick={handleLogout}>
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showProfileSetup && user) {
        return (
            <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <div className="card shadow-lg border-0" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="card-header bg-primary text-white text-center py-4">
                        <h2 className="mb-0">Welcome to Your Dashboard, {user.full_name || user.username}!</h2>
                        <p className="mb-0 mt-2">Let's get your profile set up</p>
                    </div>
                    <div className="card-body p-5">
                        <p className="lead text-center mb-4">
                            Choose the type of profile that matches your role in the system.
                        </p>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-4">
                                <div className="card h-100 border-primary">
                                    <div className="card-body text-center d-flex flex-column">
                                        <i className="bi bi-heart-pulse display-4 text-primary mb-3"></i>
                                        <h4 className="card-title text-primary">Patient Profile</h4>
                                        <p className="card-text flex-grow-1">
                                            I want to manage my health records, book appointments, and track my medical history.
                                        </p>
                                        <button onClick={() => handleProfileSetup("patient")} className="btn btn-primary btn-lg mt-auto">
                                            Set Up as Patient
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4">
                                <div className="card h-100 border-info">
                                    <div className="card-body text-center d-flex flex-column">
                                        <i className="bi bi-briefcase display-4 text-info mb-3"></i>
                                        <h4 className="card-title text-info">Doctor Profile</h4>
                                        <p className="card-text flex-grow-1">
                                            I am a healthcare provider who wants to manage appointments and patient care.
                                        </p>
                                        <button onClick={() => handleProfileSetup("doctor")} className="btn btn-info btn-lg mt-auto">
                                            Set Up as Doctor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h1 className="text-primary mb-2">
                                {patient
                                    ? `Welcome back, ${patient.user_full_name || user.full_name || user.username}!`
                                    : doctor
                                        ? `Welcome back, Dr. ${doctor.user_full_name || user.full_name || user.username}!`
                                        : `Welcome back, ${user.full_name || user.username}!`}
                            </h1>
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                <span className="badge bg-secondary fs-6">{user.role}</span>
                                <span className="text-muted">{user.email}</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="btn btn-outline-danger">
                            <i className="bi bi-box-arrow-right me-2"></i>Logout
                        </button>
                    </div>
                </div>
            </div>

            {roleMismatch && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="alert alert-warning d-flex align-items-center">
                            <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                            <div className="flex-grow-1">
                                <h5 className="alert-heading mb-2">Profile Role Mismatch Detected</h5>
                                <p className="mb-0">
                                    Your account role (<strong>{user.role}</strong>) doesn't match your profile type. Please contact support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {patient && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-primary text-white py-3">
                                <h5 className="mb-0">
                                    <i className="bi bi-person-heart me-2"></i>
                                    Patient Dashboard
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row align-items-stretch">
                                    <div className="col-12 col-lg-8 mb-3 mb-lg-0">
                                        <div className="card h-100 border-0 bg-light">
                                            <div className="card-body">
                                                <h6 className="card-title text-primary mb-3">
                                                    <i className="bi bi-info-circle me-2"></i>
                                                    Personal Information
                                                </h6>
                                                <div className="row g-3">
                                                    <div className="col-12 col-sm-6">
                                                        <strong className="d-block text-muted small">Blood Type</strong>
                                                        <span className="badge bg-info fs-6">{patient.blood_type || "Not specified"}</span>
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <strong className="d-block text-muted small">Insurance Type</strong>
                                                        <span className="badge bg-success fs-6">{patient.insurance_type || "Not specified"}</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <strong className="d-block text-muted small">Allergies</strong>
                                                        <span>{patient.allergies || "None recorded"}</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <strong className="d-block text-muted small">Chronic Conditions</strong>
                                                        <span>{patient.chronic_illness || "None recorded"}</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <strong className="d-block text-muted small">Current Medications</strong>
                                                        <span>{patient.current_medications || "None recorded"}</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <strong className="d-block text-muted small">Emergency Contact</strong>
                                                        <div>
                                                            {patient.emergency_contact_name ? (
                                                                <>
                                                                    {patient.emergency_contact_name}
                                                                    {patient.emergency_contact_phone && (
                                                                        <div className="text-muted small">{patient.emergency_contact_phone}</div>
                                                                    )}
                                                                </>
                                                            ) : "Not provided"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 col-lg-4">
                                        <div className="card h-100 border-0 bg-light">
                                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                                <h6 className="text-primary mb-3">
                                                    <i className="bi bi-lightning me-2"></i>
                                                    Quick Actions
                                                </h6>
                                                <div className="d-grid gap-2">
                                                    <button
                                                        className="btn btn-primary btn-lg py-3"
                                                        onClick={() => navigate("/appointments")}>
                                                        <i className="bi bi-calendar-plus me-2"></i>
                                                        Book Appointment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {doctor && (
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-info text-white py-3">
                                <h5 className="mb-0">
                                    <i className="bi bi-briefcase me-2"></i>
                                    Doctor Dashboard
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row align-items-stretch">
                                    <div className="col-12 col-lg-8 mb-3 mb-lg-0">
                                        <div className="card h-100 border-0 bg-light">
                                            <div className="card-body">
                                                <h6 className="card-title text-info mb-3">
                                                    <i className="bi bi-hospital me-2"></i>
                                                    Professional Information
                                                </h6>
                                                <div className="row g-3">
                                                    <div className="col-12 col-sm-6">
                                                        <strong className="d-block text-muted small">Specialty</strong>
                                                        <span className="badge bg-info text-white fs-6">
                                                            {doctor.specialty || "Not specified"}
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <strong className="d-block text-muted small">Status</strong>
                                                        <span className="badge bg-success fs-6">Active</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <strong className="d-block text-muted small">Hospital</strong>
                                                        <span>{doctor.hospital || "Not specified"}</span>
                                                    </div>
                                                    {doctor.license_number && (
                                                        <div className="col-12">
                                                            <strong className="d-block text-muted small">License Number</strong>
                                                            <span className="font-monospace">{doctor.license_number}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12 col-lg-4">
                                        <div className="card h-100 border-0 bg-light">
                                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                                <h6 className="text-info mb-3">
                                                    <i className="bi bi-lightning me-2"></i>
                                                    Quick Actions
                                                </h6>
                                                <div className="d-grid gap-2">
                                                    <button 
                                                        className="btn btn-info btn-lg py-3"
                                                        onClick={() => navigate("/appointments")}>
                                                        <i className="bi bi-calendar-week me-2"></i>
                                                        View Appointments
                                                    </button>
                                                    <button 
                                                        className="btn btn-outline-info py-3"
                                                        onClick={() => navigate("/patientlist")}>
                                                        <i className="bi bi-people me-2"></i>
                                                        Manage Patients
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="text-center py-4 mt-5">
                <small className="text-muted">
                    <i className="bi bi-shield-lock me-1"></i>
                    All information is kept confidential and secure. Only essential medical staff will have access to this data.
                </small>
            </footer>
        </div>
    );
};

export default Dashboard;