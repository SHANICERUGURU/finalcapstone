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

  const handleReturnFromProfileSetup = () => {
    fetchDashboardData();
  };

  // Loading state
  if (loading) {
    return (
      <div className="container-fluid text-center py-5 w-100">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Setting up your dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container-fluid py-5 w-100">
        <div className="alert alert-danger w-100" role="alert">
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

  // Profile setup prompt
  if (showProfileSetup && user) {
    return (
      <div className="container-fluid py-5 w-100">
        <div className="card shadow-lg border-0 w-100">
          <div className="card-header bg-primary text-white text-center py-4">
            <h2 className="mb-0">Welcome to Your Dashboard, {user.full_name || user.username}!</h2>
            <p className="mb-0 mt-2">Let's get your profile set up</p>
          </div>
          <div className="card-body p-5 w-100">
            <p className="lead text-center mb-4">
              Choose the type of profile that matches your role in the system.
            </p>
            <div className="row w-100">
              <div className="col-12 col-md-6 mb-4">
                <div className="card h-100 border-primary w-100">
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
                <div className="card h-100 border-info w-100">
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

  // Main Dashboard
  return (
    <>
      <div className="container-fluid py-4 w-100">
        {/* Header */}
        <div className="row mb-4 w-100">
          <div className="col-12 d-flex justify-content-between align-items-center w-100">
            <div>
              <h1 className="text-primary mb-1">
                {patient
                  ? `Welcome back, ${patient.user_full_name || user.full_name || user.username}!`
                  : doctor
                  ? `Welcome back, Dr. ${doctor.user_full_name || user.full_name || user.username}!`
                  : `Welcome back, ${user.full_name || user.username}!`}
              </h1>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <span className="badge bg-secondary fs-6">{user.role}</span>
                <span className="text-muted">{user.email}</span>
                {(patient || doctor) && (
                  <button onClick={handleReturnFromProfileSetup} className="btn btn-outline-primary btn-sm">
                    Refresh Profile
                  </button>
                )}
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        </div>

        {/* Role mismatch */}
        {roleMismatch && (
          <div className="alert alert-warning d-flex align-items-center w-100" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
            <div>
              <h5 className="alert-heading mb-2">Profile Role Mismatch Detected</h5>
              <p className="mb-0">
                Your account role (<strong>{user.role}</strong>) doesn't match your profile type. Please contact support.
              </p>
            </div>
          </div>
        )}

        {/* Patient Dashboard */}
        {patient && (
          <div className="card shadow-sm mb-4 w-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Your Patient Dashboard</h5>
            </div>
            <div className="card-body row w-100">
              <div className="col-12 col-md-6">
                <div className="card bg-light mb-3 w-100">
                  <div className="card-body">
                    <h6 className="card-title">Personal Information</h6>
                    <p><strong>Blood Type:</strong> {patient.blood_type || "Not specified"}</p>
                    <p><strong>Allergies:</strong> {patient.allergies || "None recorded"}</p>
                    <p><strong>Chronic Conditions:</strong> {patient.chronic_illness || "None recorded"}</p>
                    {patient.emergency_contact && (
                      <p><strong>Emergency Contact:</strong> {patient.emergency_contact}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                <h6>Quick Actions</h6>
                <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-primary me-md-2">Book Appointment</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Dashboard */}
        {doctor && (
          <div className="card shadow-sm mb-4 w-100">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Your Doctor Dashboard</h5>
            </div>
            <div className="card-body row w-100">
              <div className="col-12 col-md-6">
                <div className="card bg-light mb-3 w-100">
                  <div className="card-body">
                    <h6 className="card-title">Professional Information</h6>
                    <p><strong>Specialty:</strong> {doctor.specialty || "Not specified"}</p>
                    <p><strong>Hospital:</strong> {doctor.hospital || "Not specified"}</p>
                    {doctor.license_number && (
                      <p><strong>License Number:</strong> {doctor.license_number}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                <h6>Quick Actions</h6>
                <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-info me-md-2">View Appointments</button>
                  <button className="btn btn-outline-info me-md-2">Manage Patients</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-light border-top w-100">
        <small className="text-muted">
          All information is kept confidential and secure. Only essential medical staff will have access to this data.
        </small>
      </footer>
    </>
  );
};

export default Dashboard;
