import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [roleMismatch, setRoleMismatch] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/") 
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setPatient(data.patient || null);
        setDoctor(data.doctor || null);
        setRoleMismatch(data.role_mismatch || false);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  if (!user) {
    // User not logged in
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Login to Access Your Dashboard</h5>
              </div>
              <div className="card-body">
                {/* Redirect or show login form */}
                <Link to="/login" className="btn btn-success w-100">
                  Login
                </Link>
                <hr />
                <div className="text-center">
                  <p>
                    Don’t have an account? <Link to="/register">Register here</Link>
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
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">
          {patient
            ? `Welcome, ${patient.user_full_name || user.username}!`
            : doctor
            ? `Welcome, Dr. ${doctor.user_full_name || user.username}!`
            : `Welcome, ${user.full_name || user.username}!`}
        </h2>

        {/* Logout Button */}
        <form action="/logout/" method="post">
          <button type="submit" className="btn btn-danger">Logout</button>
        </form>
      </div>

      {/* Role mismatch warning */}
      {roleMismatch && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <h4 className="alert-heading">Profile Role Mismatch!</h4>
          <p>
            You registered as a <strong>{user.role}</strong> but set up a{" "}
            <strong>{user.profile_type}</strong> profile.
          </p>
          <p>
            Please contact admin or{" "}
            <Link to="/delete-profile" className="alert-link">
              delete your current profile
            </Link>{" "}
            to set up the correct one.
          </p>
        </div>
      )}

      {/* Patient Section */}
      {patient && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Health Profile</h5>
          </div>
          <div className="card-body">
            <p><strong>Blood Type:</strong> {patient.blood_type || "Not provided"}</p>
            <p><strong>Allergies:</strong> {patient.allergies || "None reported"}</p>
            <p><strong>Chronic Illness:</strong> {patient.chronic_illness || "None reported"}</p>
            <p><strong>Last Appointment:</strong> {patient.last_appointment || "No record"}</p>
            <p><strong>Last Doctor:</strong> {patient.last_doctor || "Not specified"}</p>
            <p><strong>Emergency Contact:</strong> 
              {patient.emergency_contact_name
                ? `${patient.emergency_contact_name} (${patient.emergency_contact_phone})`
                : "Not provided"}
            </p>
            <p><strong>Insurance Type:</strong> {patient.insurance_type || "Not provided"}</p>
            <p><strong>Current Medications:</strong> {patient.current_medications || "None"}</p>
            <p><strong>Family Medical History:</strong> {patient.family_medical_history || "Not provided"}</p>
          </div>
        </div>
      )}

      {/* Edit patient profile */}
      {patient && (
        <Link to={`/my-profile-edit/${user.id}`} className="btn btn-primary">
          Edit My Details
        </Link>
      )}

      {/* Doctor Section */}
      {doctor && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">Professional Profile</h5>
          </div>
          <div className="card-body">
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Hospital:</strong> {doctor.hospital || "Not provided"}</p>
            <p><strong>License Number:</strong> {doctor.license_number || "Not provided"}</p>
            <p><strong>Member Since:</strong> {doctor.created_at}</p>
          </div>
        </div>
      )}

      {doctor && (
        <Link to={`/doctor-edit-profile/${user.id}`} className="btn btn-primary">
          Edit My Professional Details
        </Link>
      )}

      {/* No profile setup yet */}
      {!patient && !doctor && (
        <div className="alert alert-warning">
          <h4 className="alert-heading">Profile Setup Required</h4>
          <p>Welcome! Let's complete your profile so we can personalize your dashboard.</p>
          <div className="d-grid gap-2 d-md-block">
            <Link to="/profile-setup" className="btn btn-outline-primary me-2">
              Set Up Patient Profile
            </Link>
            <Link to="/doctor-profile-setup" className="btn btn-outline-info">
              Set Up Doctor Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
