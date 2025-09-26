import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import PatientEditForm from "./patienteditform"; 

const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false); // Modal state

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

    const fetchPatientData = async () => {
        try {
            setLoading(true);
            setError(null);

            let token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                navigate("/login");
                return;
            }

            // Fetch patient details
            let response = await fetch(`http://127.0.0.1:8000/api/doctor/patients/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    token = localStorage.getItem(ACCESS_TOKEN);
                    response = await fetch(`http://127.0.0.1:8000/api/doctor/patients/${id}/`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
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
                if (response.status === 403) {
                    throw new Error("Access denied. Doctor privileges required.");
                }
                if (response.status === 404) {
                    throw new Error("Patient not found.");
                }
                throw new Error(`Failed to fetch patient details: ${response.status}`);
            }

            const data = await response.json();

            // Handle different response structures
            if (data.patient) {
                setPatient(data.patient);
                setAppointments(data.appointments || []);
            } else {
                setPatient(data);
                // Fetch appointments separately if not included
                try {
                    const appointmentsResponse = await fetch(`http://127.0.0.1:8000/api/appointments/?patient=${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (appointmentsResponse.ok) {
                        const appointmentsData = await appointmentsResponse.json();
                        setAppointments(appointmentsData.results || appointmentsData || []);
                    }
                } catch (err) {
                    console.error("Failed to fetch appointments:", err);
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientData();
    }, [id, navigate]);

    // Handle update patient information
    const handleUpdatePatient = async (updatedData) => {
        try {
            let token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/api/doctor/patients/${id}/update/`, {
                method: "PATCH", // Use PATCH for partial updates
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.status === 401) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    token = localStorage.getItem(ACCESS_TOKEN);
                    const retryResponse = await fetch(`http://127.0.0.1:8000/api/doctor/patients/${id}/`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(updatedData),
                    });

                    if (!retryResponse.ok) {
                        throw new Error(`Failed to update patient: ${retryResponse.status}`);
                    }
                } else {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    navigate("/login");
                    return;
                }
            } else if (!response.ok) {
                throw new Error(`Failed to update patient: ${response.status}`);
            }

            // Refresh patient data to show updated information
            await fetchPatientData();
            
        } catch (err) {
            throw new Error(err.message);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading patient profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Error Loading Patient Profile</h4>
                    <p>{error}</p>
                    <hr />
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => navigate("/patients")}>
                            Back to Patients
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    <h4 className="alert-heading">Patient Not Found</h4>
                    <p>The requested patient profile could not be found.</p>
                    <hr />
                    <button className="btn btn-primary" onClick={() => navigate("/patients")}>
                        Back to Patients
                    </button>
                </div>
            </div>
        );
    }

    // Helper functions remain the same...
    const getPatientName = () => {
        if (patient.user_info?.full_name) return patient.user_info.full_name;
        if (patient.full_name) return patient.full_name;
        if (patient.user?.first_name && patient.user?.last_name)
            return `${patient.user.first_name} ${patient.user.last_name}`;
        if (patient.user?.username) return patient.user.username;
        return "Patient";
    };

    const getPatientEmail = () => {
        return patient.user_info?.email || patient.user?.email || patient.email || "Not provided";
    };

    const getPatientPhone = () => {
        return patient.user_info?.phone || patient.user?.phone || patient.phone_number || "Not provided";
    };

    const getPatientAge = () => {
        return patient.user_info?.age || patient.age || "Unknown";
    };

    const getPatientGender = () => {
        return patient.user_info?.gender || patient.gender || "Not specified";
    };

    const getDoctorName = (appointment) => {
        if (appointment.doctor_name) return appointment.doctor_name;
        if (appointment.doctor?.user?.first_name && appointment.doctor?.user?.last_name)
            return `Dr. ${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`;
        if (appointment.doctor?.user_name) return `Dr. ${appointment.doctor.user_name}`;
        if (appointment.doctor?.full_name) return `Dr. ${appointment.doctor.full_name}`;
        return "Doctor not assigned";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } catch (error) {
            return "Invalid date";
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return "N/A";
        try {
            return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });
        } catch (error) {
            return timeString;
        }
    };

    return (
        <div className="container mt-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="text-primary mb-1">
                        <i className="bi bi-person-circle me-2"></i> Patient Profile
                    </h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/dashboard" className="text-decoration-none">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/patients" className="text-decoration-none">Patients</a>
                            </li>
                            <li className="breadcrumb-item active">{getPatientName()}</li>
                        </ol>
                    </nav>
                </div>
                <div className="d-flex gap-2">
                    <button onClick={() => navigate("/patients")} className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i> Back to Patients
                    </button>
                    <button onClick={() => navigate("/dashboard")} className="btn btn-outline-primary">
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </button>
                </div>
            </div>

            {/* Patient Information Card */}
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-person-badge me-2"></i> Personal Information
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <div
                                    className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                                    style={{ width: "80px", height: "80px" }}
                                >
                                    <i className="bi bi-person-fill text-white" style={{ fontSize: "2rem" }}></i>
                                </div>
                                <h5 className="mt-2 mb-0">{getPatientName()}</h5>
                                <small className="text-muted">Patient ID: {patient.id || patient.patient_id}</small>
                            </div>

                            <h6 className="text-muted border-bottom pb-2">Basic Details</h6>
                            <p><strong>Name:</strong> {getPatientName()}</p>
                            <p><strong>Email:</strong> {getPatientEmail()}</p>
                            <p><strong>Phone:</strong> {getPatientPhone()}</p>
                            <p><strong>Age:</strong> {getPatientAge()}</p>
                            <p><strong>Gender:</strong> {getPatientGender()}</p>

                            <h6 className="text-muted border-bottom pb-2 mt-3">Medical Information</h6>
                            <p>
                                <strong>Blood Type:</strong>{" "}
                                <span className={`badge ${patient.blood_type ? "bg-danger" : "bg-secondary"}`}>
                                    {patient.blood_type || "Unknown"}
                                </span>
                            </p>
                            <p><strong>Allergies:</strong> {patient.allergies || "None recorded"}</p>
                            <p><strong>Chronic Conditions:</strong> {patient.chronic_illness || "None recorded"}</p>

                            {patient.current_medications && (
                                <p><strong>Current Medications:</strong> {patient.current_medications}</p>
                            )}

                            {patient.family_medical_history && (
                                <p><strong>Family History:</strong> {patient.family_medical_history}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    {/* Emergency Contact */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-warning text-dark">
                            <h5 className="mb-0">
                                <i className="bi bi-telephone-fill me-2"></i> Emergency Contact
                            </h5>
                        </div>
                        <div className="card-body">
                            {patient.emergency_contact_name ? (
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Name:</strong> {patient.emergency_contact_name}</p>
                                        <p><strong>Relationship:</strong> {patient.emergency_contact_relationship || "Not specified"}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Phone:</strong> {patient.emergency_contact_phone}</p>
                                        <p><strong>Address:</strong> {patient.emergency_contact_address || "Not provided"}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted">No emergency contact information provided</p>
                            )}
                        </div>
                    </div>

                    {/* Insurance Information */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-info text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-credit-card me-2"></i> Insurance Information
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Insurance Provider:</strong> {patient.insurance_provider || "Not provided"}</p>
                                    <p><strong>Insurance Type:</strong> {patient.insurance_type || "Not provided"}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Policy Number:</strong> {patient.insurance_policy_number || "Not provided"}</p>
                                    <p><strong>Group Number:</strong> {patient.insurance_group_number || "Not provided"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appointment History */}
                    <div className="card shadow-sm mt-4">
                        <div className="card-header bg-secondary text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-calendar-check me-2"></i> Appointment History
                            </h5>
                        </div>
                        <div className="card-body">
                            {appointments.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Doctor</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appt, index) => (
                                                <tr key={index}>
                                                    <td>{formatDate(appt.date)}</td>
                                                    <td>{formatTime(appt.time)}</td>
                                                    <td>{getDoctorName(appt)}</td>
                                                    <td>{appt.reason || "Not specified"}</td>
                                                    <td>
                                                        <span
                                                            className={`badge ${appt.status === "SCHEDULED" || appt.status === "scheduled"
                                                                    ? "bg-warning"
                                                                    : appt.status === "COMPLETED" || appt.status === "completed"
                                                                        ? "bg-success"
                                                                        : appt.status === "CANCELLED" || appt.status === "cancelled"
                                                                            ? "bg-danger"
                                                                            : "bg-secondary"
                                                                }`}
                                                        >
                                                            {appt.status || "UNKNOWN"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <small className="text-muted">
                                                            {appt.notes ? (appt.notes.length > 50 ? `${appt.notes.substring(0, 50)}...` : appt.notes) : "No notes"}
                                                        </small>
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
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mt-4 justify-content-center">
                <button onClick={() => setShowEditModal(true)} className="btn btn-primary">
                    <i className="bi bi-pencil me-2"></i> Edit Patient
                </button>
                <button onClick={() => navigate("/patients")} className="btn btn-outline-dark">
                    <i className="bi bi-arrow-left me-2"></i> Back to List
                </button>
            </div>

            {/* Edit Modal */}
            <PatientEditForm
                patient={patient}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={handleUpdatePatient}
            />
        </div>
    );
};

export default PatientDetails;