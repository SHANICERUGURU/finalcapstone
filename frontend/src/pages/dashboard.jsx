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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/dashboard/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
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

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Call your logout API endpoint if you have one
      await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      // Always clear local storage and redirect
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
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
            <button 
              onClick={handleLogout} 
              className="btn btn-danger btn-lg"
            >
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
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <div className="d-flex">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>
                  <h4 className="alert-heading">Profile Role Mismatch!</h4>
                  <p className="mb-2">
                    You registered as a <strong className="text-capitalize">{user.role}</strong> 
                    but set up a <strong className="text-capitalize">{user.profile_type}</strong> profile.
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
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-heart-pulse me-2"></i>
                  Health Profile
                </h5>
                <Link to={`/my-profile-edit/${user.id}`} className="btn btn-light btn-sm">
                  <i className="bi bi-pencil me-1"></i>
                  Edit Profile
                </Link>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-muted mb-3">Personal Health Information</h6>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Blood Type</label>
                      <p className="form-control-static">{patient.blood_type || "Not provided"}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Allergies</label>
                      <p className="form-control-static">{patient.allergies || "None reported"}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Chronic Conditions</label>
                      <p className="form-control-static">{patient.chronic_illness || "None reported"}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Current Medications</label>
                      <p className="form-control-static">{patient.current_medications || "None"}</p>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="text-muted mb-3">Contact & Insurance</h6>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Emergency Contact</label>
                      <p className="form-control-static">
                        {patient.emergency_contact_name
                          ? `${patient.emergency_contact_name} (${patient.emergency_contact_phone})`
                          : "Not provided"}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Insurance Type</label>
                      <p className="form-control-static">{patient.insurance_type || "Not provided"}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Family Medical History</label>
                      <p className="form-control-static">{patient.family_medical_history || "Not provided"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-3">
                  <div className="col-12">
                    <h6 className="text-muted mb-3">Recent Activity</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Last Appointment</label>
                          <p className="form-control-static">{patient.last_appointment || "No record"}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">Last Doctor Visited</label>
                          <p className="form-control-static">{patient.last_doctor || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Sidebar for Patients */}
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-success text-white">
                <h6 className="mb-0">Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <Link to="/book-appointment" className="btn btn-outline-primary btn-sm text-start">
                    <i className="bi bi-calendar-plus me-2"></i>
                    Book Appointment
                  </Link>
                  <Link to="/medical-records" className="btn btn-outline-primary btn-sm text-start">
                    <i className="bi bi-file-medical me-2"></i>
                    View Medical Records
                  </Link>
                  <Link to="/prescriptions" className="btn btn-outline-primary btn-sm text-start">
                    <i className="bi bi-prescription me-2"></i>
                    My Prescriptions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Dashboard */}
      {doctor && (
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-briefcase me-2"></i>
                  Professional Profile
                </h5>
                <Link to={`/doctor-edit-profile/${user.id}`} className="btn btn-light btn-sm">
                  <i className="bi bi-pencil me-1"></i>
                  Edit Profile
                </Link>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Specialty</label>
                      <p className="form-control-static">{doctor.specialty}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Hospital/Clinic</label>
                      <p className="form-control-static">{doctor.hospital || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">License Number</label>
                      <p className="form-control-static">{doctor.license_number || "Not provided"}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Member Since</label>
                      <p className="form-control-static">{doctor.created_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Sidebar for Doctors */}
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-warning text-dark">
                <h6 className="mb-0">Doctor Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <Link to="/appointments" className="btn btn-outline-primary btn-sm text-start">
                    <i className="bi bi-calendar-check me-2"></i>
                    View Appointments
                  </Link>
                  <Link to="/patients-list" className="btn btn-outline-primary btn-sm text-start">
                    <i className="bi bi-people me-2"></i>
                    My Patients
                  </Link>
                  <Link to="/write-prescription" className="btn btn-outline-primary btn-sm text-start">
                    <i className="bi bi-prescription me-2"></i>
                    Write Prescription
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Profile Setup - Welcome Screen */}
      {!patient && !doctor && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-light text-center py-4">
                <i className="bi bi-person-plus display-1 text-primary"></i>
                <h3 className="mt-3">Complete Your Profile</h3>
                <p className="text-muted">Set up your profile to get started with our services</p>
              </div>
              <div className="card-body p-5">
                <div className="row text-center">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <i className="bi bi-heart-pulse display-4 text-primary"></i>
                        <h5 className="card-title mt-3">Patient Profile</h5>
                        <p className="card-text">Set up your health profile to book appointments and manage your medical records.</p>
                        <Link to="/profile-setup" className="btn btn-primary stretched-link">
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
                        <p className="card-text">Set up your professional profile to manage appointments and patient care.</p>
                        <Link to="/doctor-profile-setup" className="btn btn-info stretched-link">
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