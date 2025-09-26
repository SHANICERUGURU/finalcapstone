// PatientList.jsx - Updated version
import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; 

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          navigate("/login");
          return;
        }

        let response = await fetch("http://127.0.0.1:8000/api/doctor/patients/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            token = localStorage.getItem(ACCESS_TOKEN);
            response = await fetch("http://127.0.0.1:8000/api/doctor/patients/", {
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
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        setPatients(data.results || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" className="text-primary" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          <h4 className="alert-heading">Error Loading Patients</h4>
          <p>{error}</p>
          <hr />
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <i className="bi bi-people-fill"></i> Patient Management
          <span className="badge bg-secondary ms-2">
            {patients.length} patients
          </span>
        </h2>
        <Button variant="outline-primary" onClick={() => navigate("/dashboard")}>
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Button>
      </div>

      <div className="card shadow">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Patient List</h5>
          <Button variant="primary" size="sm" onClick={() => navigate("/dashboard")}>
            <i className="bi bi-speedometer2"></i> Dashboard
          </Button>
        </div>
        <div className="card-body">
          {patients.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Patient Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Blood Type</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id || patient.patient_id}>
                      <td>
                        <strong>
                          {patient.full_name || patient.user?.full_name || patient.user?.username || 'Unknown'}
                        </strong>
                        {patient.emergency_contact_name && (
                          <div>
                            <small className="text-muted">
                              Emergency: {patient.emergency_contact_name}
                            </small>
                          </div>
                        )}
                      </td>
                      <td>{patient.email || patient.user?.email || "Not provided"}</td>
                      <td>{patient.phone || patient.user?.phone || patient.phone_number || "Not provided"}</td>
                      <td>
                        <span className={`badge ${patient.blood_type ? "bg-danger" : "bg-secondary"}`}>
                          {patient.blood_type || "Unknown"}
                        </span>
                      </td>
                      <td>{patient.age || "Unknown"}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/patient/${patient.id || patient.patient_id}`)}
                        >
                          <i className="bi bi-eye"></i> View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-people display-1 text-muted"></i>
              <h4 className="text-muted mt-3">No Patients Found</h4>
              <p className="text-muted">There are no patients in the system yet.</p>
              <Button variant="primary" onClick={() => navigate("/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientList;