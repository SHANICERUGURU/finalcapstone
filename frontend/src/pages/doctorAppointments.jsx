import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate("/login");
      return {};
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  };

  const fetchWithAuth = async (url, options = {}) => {
    const headers = getAuthHeaders();
    if (Object.keys(headers).length === 0) {
      throw new Error("No authentication token");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        navigate("/login");
        throw new Error("Authentication failed");
      }

      return response;
    } catch (error) {
      if (error.message === "Authentication failed") {
        throw error;
      }
      throw new Error(`Network error: ${error.message}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetchWithAuth("http://127.0.0.1:8000/api/appointments/");
        
        if (response.ok) {
          const appointmentsData = await response.json();
          setAppointments(appointmentsData);
        } else if (response.status === 403) {
          setError("You don't have permission to view appointments. This page is for doctors only.");
        } else {
          setError(`Failed to load appointments: ${response.status}`);
        }
      } catch (err) {
        console.error("Error loading appointments:", err);
        if (!err.message.includes("Authentication")) {
          setError("Network error while loading appointments");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, [navigate]);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      console.log("Updating appointment:", appointmentId, "to status:", newStatus);
      
      const res = await fetchWithAuth(
        `http://127.0.0.1:8000/api/appointments/${appointmentId}/status/`,
        {
          method: "PUT",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      console.log("Response status:", res.status);
      
      const responseData = await res.json();
      console.log("Response data:", responseData);

      if (res.ok) {
        // Update the appointment in the local state
        setAppointments(prevAppointments =>
          prevAppointments.map(app =>
            app.id === appointmentId ? { ...app, status: newStatus } : app
          )
        );
        setSuccessMessage("Appointment status updated successfully!");
        setShowStatusModal(false);
        setSelectedAppointment(null);
        setError("");
        
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        // More detailed error handling
        if (responseData.error === 'Invalid status') {
          setError(`Invalid status: ${newStatus}. Please choose a valid status.`);
        } else if (responseData.error) {
          setError(`Server error: ${responseData.error}`);
        } else {
          setError(`Failed to update appointment status: ${res.status}`);
        }
      }
    } catch (err) {
      console.error("Error updating appointment status:", err);
      if (!err.message.includes("Authentication")) {
        setError("Network error while updating appointment status");
      }
    }
  };

  // Debug function to check appointment status options
  const checkStatusOptions = () => {
    // Check what status values are available in your Appointment model
    console.log("Available status options should match your model choices");
    
    // Common status options (adjust based on your model)
    const possibleStatuses = ['SCHEDULED', 'COMPLETED', 'CANCELLED'];
    console.log("Trying these statuses:", possibleStatuses);
    
    return possibleStatuses;
  };

  const openStatusModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowStatusModal(true);
    setError("");
    console.log("Selected appointment:", appointment);
    console.log("Current status:", appointment.status);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setSelectedAppointment(null);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedAppointment) {
      console.log("Changing status from", selectedAppointment.status, "to", newStatus);
      updateAppointmentStatus(selectedAppointment.id, newStatus);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-primary';
      case 'COMPLETED': return 'bg-info';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusOptions = (currentStatus) => {
    // Use the exact status values from your Appointment model
    const allStatuses = [
      { value: 'SCHEDULED', label: 'Scheduled' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'CANCELLED', label: 'Cancelled' }
    ];

    // Filter out the current status from available options
    return allStatuses.filter(status => status.value !== currentStatus);
  };

  const formatPatientName = (appointment) => {
    if (appointment.patient_name) return appointment.patient_name;
    if (appointment.patient && appointment.patient.user_name) return appointment.patient.user_name;
    if (appointment.patient_full_name) return appointment.patient_full_name;
    if (appointment.patient_first_name && appointment.patient_last_name) {
      return `${appointment.patient_first_name} ${appointment.patient_last_name}`;
    }
    return "Patient information not available";
  };

  const filterAppointmentsByStatus = (status) => {
    return appointments.filter(app => app.status === status);
  };

  // Add a debug button to check the API endpoint
  const testEndpoint = async () => {
    try {
      console.log("Testing appointments endpoint...");
      const response = await fetchWithAuth("http://127.0.0.1:8000/api/appointments/");
      const data = await response.json();
      console.log("Appointments data:", data);
      
      if (data.length > 0) {
        console.log("First appointment:", data[0]);
        console.log("Available status options in model:", checkStatusOptions());
      }
    } catch (err) {
      console.error("Test failed:", err);
    }
  };

  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return (
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="alert alert-warning">
              <h4>Authentication Required</h4>
              <p>Redirecting to login...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your appointments...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4">
            <i className="bi bi-calendar-check me-2"></i>
            Doctor Appointments
          </h2>

         

          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show">
              {successMessage}
              <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
            </div>
          )}

          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          {/* Rest of the component remains the same */}
          <div className="row mb-4">
            <div className="col-md-2 col-6">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h4 className="mb-0">{appointments.length}</h4>
                  <small>Total</small>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-6">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h4 className="mb-0">{filterAppointmentsByStatus('SCHEDULED').length}</h4>
                  <small>Scheduled</small>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-6">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h4 className="mb-0">{filterAppointmentsByStatus('COMPLETED').length}</h4>
                  <small>Completed</small>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-6">
              <div className="card bg-danger text-white">
                <div className="card-body text-center">
                  <h4 className="mb-0">{filterAppointmentsByStatus('CANCELLED').length}</h4>
                  <small>Cancelled</small>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Your Appointments ({appointments.length})</h5>
              <span className="badge bg-light text-dark">
                Today: {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="card-body">
              {appointments.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
                  <h4 className="text-muted">No Appointments Scheduled</h4>
                  <p className="text-muted">You don't have any appointments assigned to you yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{new Date(appointment.date).toLocaleDateString()}</td>
                          <td>{appointment.time}</td>
                          <td>
                            <strong>{formatPatientName(appointment)}</strong>
                            {appointment.patient_email && (
                              <div className="text-muted small">{appointment.patient_email}</div>
                            )}
                          </td>
                          <td>{appointment.reason || "Not specified"}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                              {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() => openStatusModal(appointment)}
                              title="Update status"
                            >
                              <i className="bi bi-pencil"></i> Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedAppointment && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Appointment Status</h5>
                <button type="button" className="btn-close" onClick={closeStatusModal}></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Patient:</strong> {formatPatientName(selectedAppointment)}<br />
                  <strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}<br />
                  <strong>Time:</strong> {selectedAppointment.time}<br />
                  <strong>Current Status:</strong> 
                  <span className={`badge ${getStatusBadgeClass(selectedAppointment.status)} ms-2`}>
                    {selectedAppointment.status?.charAt(0).toUpperCase() + selectedAppointment.status?.slice(1)}
                  </span>
                </p>
                
                <div className="mb-3">
                  <label className="form-label">Change Status To:</label>
                  <div className="d-grid gap-2">
                    {getStatusOptions(selectedAppointment.status).map((status) => (
                      <button
                        key={status.value}
                        className="btn btn-outline-primary text-start"
                        onClick={() => handleStatusChange(status.value)}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Debug info - remove in production */}
                <div className="mt-3 p-2 bg-light rounded">
                  <small className="text-muted">
                    Debug: Appointment ID: {selectedAppointment.id} | Current Status: {selectedAppointment.status}
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeStatusModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;