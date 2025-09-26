import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch appointments + doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, docsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/appointments/", {
            headers: getAuthHeaders(),
          }),
          fetch("http://127.0.0.1:8000/api/doctors/", {
            headers: getAuthHeaders(),
          }),
        ]);

        if (appsRes.ok) {
          setAppointments(await appsRes.json());
        }
        if (docsRes.ok) {
          setDoctors(await docsRes.json());
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Submit new appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.specialty || !form.doctor || !form.date || !form.time) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/appointments/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const newApp = await res.json();
        setAppointments([newApp, ...appointments]);
        setForm({ specialty: "", doctor: "", date: "", time: "", reason: "" });
        setShowBookingForm(false);
        setSuccessMessage("Appointment booked successfully!");
        setError("");
        
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError("Failed to book appointment");
      }
    } catch {
      setError("Network error");
    }
  };

  // Cancel appointment
  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/appointments/${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setAppointments(appointments.filter((app) => app.id !== id));
        setSuccessMessage("Appointment cancelled successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      console.error("Error cancelling appointment");
    }
  };

  const specialtyOptions = [
    { value: "GENERALDOCTOR", label: "General Doctor" },
    { value: "DENTIST", label: "Dentist" },
    { value: "ONCOLOGIST", label: "Oncologist" },
    { value: "ortho", label: "Orthopaedic" },
    { value: "OPTICIAN", label: "Optician" },
    { value: "PAEDIATRICIAN", label: "Paediatrician" },
    { value: "cardio", label: "Cardiologist" }
  ];

  if (loading) return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading appointments...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4">Appointments</h2>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show">
              {successMessage}
              <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          {/* Book Appointment Button */}
          <div className="d-grid gap-2 mb-4">
            <button 
              type="button" 
              className="btn btn-primary btn-lg" 
              onClick={() => setShowBookingForm(!showBookingForm)}
            >
              {showBookingForm ? "Cancel Booking" : "Book New Appointment"}
            </button>
          </div>

          {/* Appointment Form */}
          {showBookingForm && (
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Schedule New Appointment</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Specialty *</label>
                      <select
                        className="form-select"
                        name="specialty"
                        value={form.specialty}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Specialty</option>
                        {specialtyOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Doctor *</label>
                      <select
                        className="form-select"
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Doctor</option>
                        {doctors
                          .filter((d) => !form.specialty || d.specialty === form.specialty)
                          .map((d) => (
                            <option key={d.id} value={d.id}>
                              Dr. {d.user_full_name}
                            </option>
                          ))}
                      </select>
                      {form.specialty && (
                        <div className="form-text">
                          {doctors.filter(d => d.specialty === form.specialty).length} doctors available
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Time *</label>
                      <input
                        type="time"
                        className="form-control"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                      className="form-control"
                      name="reason"
                      rows="3"
                      value={form.reason}
                      onChange={handleChange}
                      placeholder="Briefly describe the reason for your appointment..."
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Book Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Appointments List */}
          <div className="card">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Your Appointments ({appointments.length})</h5>
              {appointments.length > 0 && (
                <span className="badge bg-light text-dark">
                  {appointments.filter(app => app.status === 'confirmed').length} Confirmed
                </span>
              )}
            </div>
            <div className="card-body">
              {appointments.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
                  <h4 className="text-muted">No Appointments Yet</h4>
                  <p className="text-muted">You haven't booked any appointments yet.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Book Your First Appointment
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Specialty</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((app) => (
                        <tr key={app.id}>
                          <td>{new Date(app.date).toLocaleDateString()}</td>
                          <td>{app.time}</td>
                          <td>Dr. {app.doctor_name}</td>
                          <td>
                            {specialtyOptions.find(s => s.value === app.specialty)?.label || app.specialty}
                          </td>
                          <td>{app.reason || "Not specified"}</td>
                          <td>
                            <span className={`badge ${
                              app.status === 'confirmed' ? 'bg-success' :
                              app.status === 'pending' ? 'bg-warning' : 
                              app.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                            }`}>
                              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => cancelAppointment(app.id)}
                              disabled={app.status === "cancelled"}
                            >
                              {app.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
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
    </div>
  );
}

export default Appointments;