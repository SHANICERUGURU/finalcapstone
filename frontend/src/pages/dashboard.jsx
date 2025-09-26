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

  // Separate refresh token function
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

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate("/login");
  };

  const handleProfileSetup = (type) => {
    if (type === 'patient') {
      navigate('/profile-setup');
    } else {
      navigate('/doctor-profile-setup');
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const fetchDashboardData = async () => {
      try {
        if (!isMounted) return;

        setError(null);
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        // Check token without causing re-renders
        if (!token) {
          if (isMounted) {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            navigate("/login");
          }
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
            const newToken = localStorage.getItem(ACCESS_TOKEN);
            response = await fetch("http://127.0.0.1:8000/dashboard/", {
              headers: {
                Authorization: `Bearer ${newToken}`,
                "Content-Type": "application/json",
              },
            });
          } else {
            if (isMounted) {
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(REFRESH_TOKEN);
              navigate("/login");
            }
            return;
          }
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }

        const data = await response.json();
        
        if (!isMounted) return;

        // Batch state updates
        setUser(data.user);
        setPatient(data.patient || null);
        setDoctor(data.doctor || null);
        setRoleMismatch(data.role_mismatch || false);

        // Set profile setup flag last
        const shouldShowProfileSetup = !data.patient && !data.doctor && !data.role_mismatch;
        if (showProfileSetup !== shouldShowProfileSetup) {
          setShowProfileSetup(shouldShowProfileSetup);
        }

      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - navigate is stable

  // Show loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Setting up your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-danger" role="alert">
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
        </div>
      </div>
    );
  }

  // Profile Setup Screen
  if (showProfileSetup && user) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-4">
                <h2 className="mb-0">Welcome to Your Dashboard, {user.full_name || user.username}!</h2>
                <p className="mb-0 mt-2">Let's get your profile set up</p>
              </div>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <p className="lead">
                    Choose the type of profile that matches your role in the system.
                  </p>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body text-center d-flex flex-column">
                        <div className="mb-3">
                          <i className="bi bi-heart-pulse display-4 text-primary"></i>
                        </div>
                        <h4 className="card-title text-primary">Patient Profile</h4>
                        <p className="card-text flex-grow-1">
                          I want to manage my health records, book appointments, and track my medical history.
                        </p>
                        <button 
                          onClick={() => handleProfileSetup('patient')}
                          className="btn btn-primary btn-lg mt-auto"
                        >
                          Set Up as Patient
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-info">
                      <div className="card-body text-center d-flex flex-column">
                        <div className="mb-3">
                          <i className="bi bi-briefcase display-4 text-info"></i>
                        </div>
                        <h4 className="card-title text-info">Doctor Profile</h4>
                        <p className="card-text flex-grow-1">
                          I am a healthcare provider who wants to manage appointments and patient care.
                        </p>
                        <button 
                          onClick={() => handleProfileSetup('doctor')}
                          className="btn btn-info btn-lg mt-auto"
                        >
                          Set Up as Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    You can always update your profile later from the settings menu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard Content
  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-primary mb-1">
                {patient
                  ? `Welcome back, ${patient.user_full_name || user.full_name || user.username}!`
                  : doctor
                  ? `Welcome back, Dr. ${doctor.user_full_name || user.full_name || user.username}!`
                  : `Welcome back, ${user.full_name || user.username}!`}
              </h1>
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-secondary fs-6">{user.role}</span>
                <span className="text-muted">{user.email}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Role Mismatch Alert */}
      {roleMismatch && (
        <div className="row mb-4">
          <div className="col">
            <div className="alert alert-warning" role="alert">
              <div className="d-flex align-items-center">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>
                  <h5 className="alert-heading mb-2">Profile Role Mismatch Detected</h5>
                  <p className="mb-0">
                    Your account role (<strong>{user.role}</strong>) doesn't match your profile type. 
                    Please contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Dashboard */}
      {patient && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Your Patient Dashboard</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h6 className="card-title">Personal Information</h6>
                        <p><strong>Blood Type:</strong> {patient.blood_type || 'Not specified'}</p>
                        <p><strong>Allergies:</strong> {patient.allergies || 'None recorded'}</p>
                        <p><strong>Chronic Conditions:</strong> {patient.chronic_illness || 'None recorded'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6>Quick Actions</h6>
                    <div className="d-grid gap-2 d-md-flex">
                      <button className="btn btn-primary me-md-2">Book Appointment</button>
                      <button className="btn btn-outline-primary me-md-2">View Medical Records</button>
                      <button className="btn btn-outline-primary">Message Doctor</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Dashboard */}
      {doctor && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Your Doctor Dashboard</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card bg-light">
                      <div className="card-body">
                        <h6 className="card-title">Professional Information</h6>
                        <p><strong>Specialty:</strong> {doctor.specialty || 'Not specified'}</p>
                        <p><strong>Hospital:</strong> {doctor.hospital || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6>Quick Actions</h6>
                    <div className="d-grid gap-2 d-md-flex">
                      <button className="btn btn-info me-md-2">View Appointments</button>
                      <button className="btn btn-outline-info me-md-2">Manage Patients</button>
                      <button className="btn btn-outline-info">Medical Records</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No profiles found */}
      {!patient && !doctor && user && !roleMismatch && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">Setup Incomplete</h5>
              </div>
              <div className="card-body text-center py-5">
                <i className="bi bi-person-plus display-1 text-warning mb-3"></i>
                <h4>Profile Setup Required</h4>
                <p className="text-muted mb-4">
                  Please set up your profile to access dashboard features.
                </p>
                <button 
                  onClick={() => setShowProfileSetup(true)}
                  className="btn btn-warning btn-lg"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;