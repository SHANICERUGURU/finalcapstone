import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const { id } = useParams(); // patient ID from URL
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient data and appointments with JWT
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);

        // ✅ Retrieve token from localStorage
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        // Common headers
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Fetch patient info
        const resPatient = await fetch(`/api/patients/${id}/`, { headers });
        if (!resPatient.ok) throw new Error("Failed to fetch patient details");
        const patientData = await resPatient.json();

        // Fetch appointments
        const resAppointments = await fetch(`/api/patients/${id}/appointments/`, { headers });
        if (!resAppointments.ok) throw new Error("Failed to fetch appointments");
        const appointmentsData = await resAppointments.json();

        setPatient(patientData);
        setAppointments(appointmentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading patient profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">Patient not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-primary mb-1">
            <i className="bi bi-person-circle"></i> Patient Profile
          </h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/patients">Patients</a>
              </li>
              <li className="breadcrumb-item active">
                {patient?.user?.fullName || "Patient"}
              </li>
            </ol>
          </nav>
        </div>
        <button onClick={() => navigate("/patients")} className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Back to Patients
        </button>
      </div>

      {/* Patient Information Card */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Personal Information</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div
                  className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="bi bi-person-fill text-white" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>

              <h6 className="text-muted">Basic Details</h6>
              <p><strong>Name:</strong> {patient?.user?.fullName}</p>
              <p><strong>Username:</strong> {patient?.user?.username}</p>
              <p><strong>Email:</strong> {patient?.user?.email}</p>
              <p><strong>Phone:</strong> {patient?.phone_number || "Not provided"}</p>

              <hr />

              <h6 className="text-muted">Medical Information</h6>
              <p>
                <strong>Blood Type:</strong>{" "}
                <span className="badge bg-danger">
                  {patient?.blood_type || "Unknown"}
                </span>
              </p>
              <p><strong>Allergies:</strong> {patient?.allergies || "None"}</p>
              <p><strong>Chronic Conditions:</strong> {patient?.chronic_illness || "None"}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {/* Emergency Contact */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-warning">
              <h5 className="mb-0">Emergency Contact</h5>
            </div>
            <div className="card-body">
              {patient?.emergency_contact_name ? (
                <>
                  <p><strong>Name:</strong> {patient.emergency_contact_name}</p>
                  <p><strong>Phone:</strong> {patient.emergency_contact_phone}</p>
                </>
              ) : (
                <p className="text-muted">No emergency contact information provided</p>
              )}
            </div>
          </div>

          {/* Insurance Information */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Insurance Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Insurance Type:</strong> {patient?.insurance_type || "Not provided"}</p>
              <p><strong>Insurance ID:</strong> {patient?.insurance_id || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Appointment History</h5>
        </div>
        <div className="card-body">
          {appointments && appointments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, index) => (
                    <tr key={index}>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>Dr. {appt.doctor?.fullName}</td>
                      <td>{appt.reason}</td>
                      <td>
                        <span
                          className={`badge ${
                            appt.status === "SCHEDULED"
                              ? "bg-warning"
                              : appt.status === "COMPLETED"
                              ? "bg-success"
                              : appt.status === "CANCELLED"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x display-4 text-muted"></i>
              <p className="text-muted mt-3">No appointments found for this patient</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-4">
        <button onClick={() => navigate(`/patients/${id}/edit`)} className="btn btn-primary">
          <i className="bi bi-pencil"></i> Edit Patient
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;
