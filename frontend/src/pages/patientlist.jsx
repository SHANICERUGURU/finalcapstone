import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch patients from backend API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await fetch("http://127.0.0.1:8000/api/doctor/patients/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        setPatients(data.results || data); // handle pagination (DRF gives results)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <i className="bi bi-people-fill"></i> Patient Management
          <span className="badge bg-secondary ms-2">
            {patients.length} patients
          </span>
        </h2>
      </div>

      <div className="card shadow">
        <div className="card-header bg-light">
          <h5 className="mb-0">Patient List</h5>
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
                    <th>Last Visit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <td>
                        <strong>
                          {patient.user?.full_name || patient.user?.username}
                        </strong>
                        {patient.emergency_contact_name && (
                          <br />
                        )}
                        {patient.emergency_contact_name && (
                          <small className="text-muted">
                            Emergency: {patient.emergency_contact_name}
                          </small>
                        )}
                      </td>
                      <td>{patient.user?.email}</td>
                      <td>{patient.phone_number || "Not provided"}</td>
                      <td>
                        <span
                          className={`badge ${
                            patient.blood_type ? "bg-danger" : "bg-secondary"
                          }`}
                        >
                          {patient.blood_type || "Unknown"}
                        </span>
                      </td>
                      <td>
                        {patient.last_appointment ? (
                          new Date(patient.last_appointment).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )
                        ) : (
                          <span className="text-muted">Never</span>
                        )}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row navigation
                            navigate(`/patients/${patient.id}`);
                          }}
                        >
                          <i className="bi bi-eye"></i> View
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientList;
