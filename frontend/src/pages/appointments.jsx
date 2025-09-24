import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Appointments() {
  const [user, setUser] = useState(null); // logged-in user
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keepFormOpen, setKeepFormOpen] = useState(false);
  const [form, setForm] = useState({
    specialty: "",
    date: "",
    time: "",
    doctor: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});

  // Helper: get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  };

  // Fetch current user & appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch user info
        const userRes = await fetch("http://127.0.0.1:8000/api/users/", {
          headers: getAuthHeaders(),
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
          if (userData.patient) {
            setPatient(userData.patient);
          }
        }

        // 2. Fetch appointments
        const appRes = await fetch("http://127.0.0.1:8000/appointments/", {
          headers: getAuthHeaders(),
        });
        if (appRes.ok) {
          const appData = await appRes.json();
          setAppointments(appData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle new appointment submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch("http://127.0.0.1:8000/appointments/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData);
        setKeepFormOpen(true);
        return;
      }

      // Refresh appointments
      const newApp = await res.json();
      setAppointments([...appointments, newApp]);
      setForm({ specialty: "", date: "", time: "", doctor: "", reason: "" });
      setKeepFormOpen(false);
    } catch (err) {
      console.error("Error submitting appointment:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          {user && patient ? (
            <>
              <h2 className="mb-4">Welcome, {patient.user.username}!</h2>

              {/* Appointments */}
              {appointments.length > 0 ? (
                <div className="card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Your Appointments</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Date & Time</th>
                            <th>Doctor</th>
                            <th>Reason</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                              <td>
                                {appointment.date} at {appointment.time}
                              </td>
                              <td>Dr. {appointment.doctor_name}</td>
                              <td>{appointment.reason}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    appointment.status === "SCHEDULED"
                                      ? "bg-warning"
                                      : appointment.status === "COMPLETED"
                                      ? "bg-success"
                                      : appointment.status === "CANCELLED"
                                      ? "bg-danger"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-info">
                  <h5 className="alert-heading">No Appointments Yet</h5>
                  <p className="mb-0">
                    You don't have any appointments scheduled. Click below to
                    book your first one.
                  </p>
                </div>
              )}

              {/* Book Appointment Button */}
              <div className="d-grid gap-2 mb-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => setKeepFormOpen(!keepFormOpen)}
                >
                  <i className="bi bi-calendar-plus"></i> Book New Appointment
                </button>
              </div>

              {/* Appointment Form */}
              {keepFormOpen && (
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Schedule New Appointment</h5>
                  </div>
                  <div className="card-body">
                    {errors.general && (
                      <div className="alert alert-danger">{errors.general}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Specialty</label>
                          <select
                            name="specialty"
                            value={form.specialty}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select Specialty</option>
                            <option value="dentist">Dentist</option>
                            <option value="surgeon">Surgeon</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Time</label>
                          <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Doctor</label>
                          <input
                            type="text"
                            name="doctor"
                            value={form.doctor}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Doctor's Name"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Reason</label>
                          <input
                            type="text"
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Reason for visit"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setKeepFormOpen(false)}
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
            </>
          ) : user ? (
            <div className="alert alert-warning">
              <h4 className="alert-heading">Profile Setup Required</h4>
              <p>You need to complete your patient profile before accessing appointments.</p>
              <hr />
              <Link to="/profile_setup" className="btn btn-primary">
                Complete Profile Setup
              </Link>
            </div>
          ) : (
            <div className="alert alert-danger">
              <h4 className="alert-heading">Access Denied</h4>
              <p>You must be logged in to access this page.</p>
              <hr />
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-primary ms-2">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
