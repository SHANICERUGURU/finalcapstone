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

        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        // Common headers - FIXED: Use "Token" instead of "Bearer"
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        };

        // Fetch patient info from doctor endpoint
        const resPatient = await fetch(`/api/doctor/patients/${id}/`, { headers });
        
        if (!resPatient.ok) {
          if (resPatient.status === 403) {
            throw new Error("Access denied. Doctor privileges required.");
          }
          if (resPatient.status === 404) {
            throw new Error("Patient not found.");
          }
          throw new Error("Failed to fetch patient details");
        }
        
        const patientData = await resPatient.json();

        // Fetch appointments with patient filter
        const resAppointments = await fetch(`/api/appointments/?patient=${id}`, { headers });
        
        if (resAppointments.ok) {
          const appointmentsData = await resAppointments.json();
          setAppointments(appointmentsData);
        } else {
          // If filtering doesn't work, use all appointments and filter client-side
          const resAllAppointments = await fetch('/api/appointments/', { headers });
          if (resAllAppointments.ok) {
            const allAppointments = await resAllAppointments.json();
            // Filter client-side by patient ID
            const patientAppointments = allAppointments.filter(apt => apt.patient == id);
            setAppointments(patientAppointments);
          }
        }

        // Handle API response structure (could be {patient: {...}} or direct patient object)
        setPatient(patientData.patient || patientData);
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
        <button onClick={() => navigate("/patients")} className="btn btn-primary mt-2">
          <i className="bi bi-arrow-left"></i> Back to Patients
        </button>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">Patient not found</div>
        <button onClick={() => navigate("/patients")} className="btn btn-primary mt-2">
          <i className="bi bi-arrow-left"></i> Back to Patients
        </button>
      </div>
    );
  }

  // Helper function to get patient name based on API response structure
  const getPatientName = () => {
    if (patient.user_info?.full_name) return patient.user_info.full_name;
    if (patient.full_name) return patient.full_name;
    if (patient.user?.first_name && patient.user?.last_name) 
      return `${patient.user.first_name} ${patient.user.last_name}`;
    return "Patient";
  };

  // Helper function to get patient email
  const getPatientEmail = () => {
    return patient.user_info?.email || patient.user?.email || "Not provided";
  };

  // Helper function to get patient phone
  const getPatientPhone = () => {
    return patient.user_info?.phone || patient.user?.phone || patient.phone_number || "Not provided";
  };

  // Helper function to get doctor name from appointment
  const getDoctorName = (appointment) => {
    if (appointment.doctor_name) return appointment.doctor_name;
    if (appointment.doctor?.user?.first_name && appointment.doctor?.user?.last_name)
      return `Dr. ${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`;
    if (appointment.doctor?.user_name) return `Dr. ${appointment.doctor.user_name}`;
    return "Doctor not assigned";
  };

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
                {getPatientName()}
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
              <p><strong>Name:</strong> {getPatientName()}</p>
              <p><strong>Email:</strong> {getPatientEmail()}</p>
              <p><strong>Phone:</strong> {getPatientPhone()}</p>
              
              {/* Display age if available */}
              {patient.user_info?.age && (
                <p><strong>Age:</strong> {patient.user_info.age}</p>
              )}
              
              {/* Display gender if available */}
              {patient.user_info?.gender && (
                <p><strong>Gender:</strong> {patient.user_info.gender}</p>
              )}

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
              
              {/* Display additional medical info if available */}
              {patient?.current_medications && (
                <p><strong>Current Medications:</strong> {patient.current_medications}</p>
              )}
              
              {patient?.family_medical_history && (
                <p><strong>Family History:</strong> {patient.family_medical_history}</p>
              )}
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
            </div>
          </div>

          {/* Recent Activity Stats */}
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Patient Statistics</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <h4 className="text-primary">{appointments.length}</h4>
                    <p className="mb-0 text-muted">Total Appointments</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <h4 className="text-success">
                      {appointments.filter(apt => apt.status === 'COMPLETED').length}
                    </h4>
                    <p className="mb-0 text-muted">Completed</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border rounded p-3">
                    <h4 className="text-warning">
                      {appointments.filter(apt => apt.status === 'SCHEDULED').length}
                    </h4>
                    <p className="mb-0 text-muted">Upcoming</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="card shadow-sm mt-4">
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
                      <td>{appt.date || "N/A"}</td>
                      <td>{appt.time || "N/A"}</td>
                      <td>{getDoctorName(appt)}</td>
                      <td>{appt.reason || "Not specified"}</td>
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
                          {appt.status || "UNKNOWN"}
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
        <button onClick={() => navigate(`/appointments/new?patient=${id}`)} className="btn btn-success">
          <i className="bi bi-plus-circle"></i> New Appointment
        </button>
        <button onClick={() => window.print()} className="btn btn-outline-secondary">
          <i className="bi bi-printer"></i> Print Profile
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;