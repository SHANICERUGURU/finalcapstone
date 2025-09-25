import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [roleMismatch, setRoleMismatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const refreshAccessToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) return false;

      const res = await fetch("http://127.0.0.1:8000/api/auth/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem("token", data.access); // update access token
      return true;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      return false;
    }
  };
  const fetchDashboardData = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      let response = await fetch("http://127.0.0.1:8000/dashboard/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // If access token expired → try refresh
      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          token = localStorage.getItem("token");
          response = await fetch("http://127.0.0.1:8000/dashboard/", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
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
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);
  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      navigate("/login");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
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
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
                <Link to="/login" className="btn btn-outline-primary">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center">
                <h5 className="mb-0">Login to Access Your Dashboard</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-3">
                  <Link to="/login" className="btn btn-success btn-lg">
                    Login to Your Account
                  </Link>
                  <Link to="/register" className="btn btn-outline-primary">
                    Create New Account
                  </Link>
                </div>
                <hr />
                <div className="text-center">
                  <p className="text-muted mb-0">
                    Access your health records and manage your profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="text-primary mb-2">
                {patient
                  ? `Welcome, ${patient.user_full_name || user.full_name || user.username}!`
                  : doctor
                  ? `Welcome, Dr. ${doctor.user_full_name || user.full_name || user.username}!`
                  : `Welcome, ${user.full_name || user.username}!`}
              </h1>
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-secondary fs-6">{user.role}</span>
                <span className="text-muted">{user.email}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-danger btn-lg">
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Role Mismatch Alert */}
      {roleMismatch && (
        <div className="row mb-4">
          <div className="col">
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <div className="d-flex">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>
                  <h4 className="alert-heading">Profile Role Mismatch!</h4>
                  <p className="mb-2">
                    You registered as a{" "}
                    <strong className="text-capitalize">{user.role}</strong> but
                    set up a{" "}
                    <strong className="text-capitalize">
                      {user.profile_type}
                    </strong>{" "}
                    profile.
                  </p>
                  <p className="mb-0">
                    Please contact administrator or{" "}
                    <Link to="/delete-profile" className="alert-link fw-bold">
                      delete your current profile
                    </Link>{" "}
                    to set up the correct one.
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
          <div className="col-lg-8">
            {/* Patient details here (unchanged) */}
          </div>
        </div>
      )}

      {/* Doctor Dashboard */}
      {doctor && (
        <div className="row">
          <div className="col-lg-8">
            {/* Doctor details here (unchanged) */}
          </div>
        </div>
      )}

      {/* No Profile Setup */}
      {!patient && !doctor && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light text-center py-4">
                <i className="bi bi-person-plus display-1 text-primary"></i>
                <h3 className="mt-3">Complete Your Profile</h3>
                <p className="text-muted">
                  Set up your profile to get started with our services
                </p>
              </div>
              <div className="card-body p-5">
                <div className="row text-center">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <i className="bi bi-heart-pulse display-4 text-primary"></i>
                        <h5 className="card-title mt-3">Patient Profile</h5>
                        <p className="card-text">
                          Set up your health profile to book appointments and
                          manage your medical records.
                        </p>
                        <Link
                          to="/profile-setup"
                          className="btn btn-primary stretched-link"
                        >
                          Set Up Patient Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-info">
                      <div className="card-body">
                        <i className="bi bi-briefcase display-4 text-info"></i>
                        <h5 className="card-title mt-3">Doctor Profile</h5>
                        <p className="card-text">
                          Set up your professional profile to manage
                          appointments and patient care.
                        </p>
                        <Link
                          to="/doctor-profile-setup"
                          className="btn btn-info stretched-link"
                        >
                          Set Up Doctor Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
