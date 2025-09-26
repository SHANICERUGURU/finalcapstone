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
          const appointmentsData = await appsRes.json();
          setAppointments(appointmentsData);
        } else if (appsRes.status === 403) {
          setError("You don't have permission to view appointments");
        } else {
          setError("Failed to load appointments");
        }

        if (docsRes.ok) {
          const doctorsData = await docsRes.json();
          console.log("Doctors data:", doctorsData); // Check what fields are available
          setDoctors(doctorsData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Network error while loading data");
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
      const appointmentData = {
        ...form,
        doctor: parseInt(form.doctor) // Ensure it's a number
      };

      const res = await fetch("http://127.0.0.1:8000/api/appointments/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(appointmentData),
      });

      const responseData = await res.json();

      if (res.ok) {
        setAppointments([responseData, ...appointments]);
        setForm({ specialty: "", doctor: "", date: "", time: "", reason: "" });
        setShowBookingForm(false);
        setSuccessMessage("Appointment booked successfully!");
        setError("");
        
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        if (responseData.error === 'Patient profile not found') {
          setError("Please complete your patient profile first");
        } else if (responseData.error === 'Doctor specialty mismatch') {
          setError("Selected doctor doesn't match the specialty");
        } else if (responseData.error === 'Only patients can create appointments') {
          setError("Only patients can book appointments");
        } else {
          setError(responseData.error || "Failed to book appointment");
        }
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      setError("Network error while booking appointment");
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

      const responseData = await res.json();

      if (res.ok) {
        setAppointments(appointments.filter((app) => app.id !== id));
        setSuccessMessage("Appointment cancelled successfully!");
        setError("");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(`Failed to cancel: ${responseData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      setError("Network error while cancelling appointment");
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

  // ✅ FIXED: Get doctor display name - check what fields are available
  const getDoctorDisplayName = (doctor) => {
    // Check the console log to see what fields are available in doctor objects
    if (doctor.user_full_name) return doctor.user_full_name;
    if (doctor.full_name) return doctor.full_name;
    if (doctor.name) return doctor.name;
    if (doctor.user?.get_full_name) return doctor.user.get_full_name;
    if (doctor.user?.first_name && doctor.user?.last_name) 
      return `${doctor.user.first_name} ${doctor.user.last_name}`;
    if (doctor.first_name && doctor.last_name) 
      return `${doctor.first_name} ${doctor.last_name}`;
    if (doctor.user?.username) return doctor.user.username;
    if (doctor.username) return doctor.username;
    if (doctor.user?.email) return doctor.user.email;
    if (doctor.email) return doctor.email;
    return "Unknown Doctor";
  };

  // ✅ FIXED: Get specialty label
  const getSpecialtyLabel = (specialtyValue) => {
    const specialty = specialtyOptions.find(s => s.value === specialtyValue);
    return specialty ? specialty.label : specialtyValue;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'cancelled': return 'bg-danger';
      case 'completed': return 'bg-info';
      case 'scheduled': return 'bg-primary';
      default: return 'bg-secondary';
    }
  };

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
                        disabled={!form.specialty}
                      >
                        <option value="">Select Doctor</option>
                        {doctors
                          .filter((d) => !form.specialty || d.specialty === form.specialty)
                          .map((d) => (
                            <option key={d.id} value={d.id}>
                              {/* ✅ FIXED: Use the function to get proper doctor name */}
                              Dr. {getDoctorDisplayName(d)} - {getSpecialtyLabel(d.specialty)}
                            </option>
                          ))}
                      </select>
                      {!form.specialty && (
                        <div className="form-text">Please select a specialty first</div>
                      )}
                      {form.specialty && (
                        <div className="form-text">
                          {doctors.filter(d => d.specialty === form.specialty).length} doctor(s) available in {getSpecialtyLabel(form.specialty)}
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
                  {appointments.filter(app => app.status === 'confirmed' || app.status === 'scheduled').length} Active
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
                          <td>Dr. {app.doctor_name || "Unknown Doctor"}</td>
                          <td>{getSpecialtyLabel(app.specialty)}</td>
                          <td>{app.reason || "Not specified"}</td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                              {app.status?.charAt(0).toUpperCase() + app.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => cancelAppointment(app.id)}
                              disabled={app.status === "cancelled" || app.status === "completed"}
                              title={app.status === "cancelled" ? "Already cancelled" : app.status === "completed" ? "Appointment completed" : "Cancel appointment"}
                            >
                              {app.status === 'cancelled' ? 'Cancelled' : 
                               app.status === 'completed' ? 'Completed' : 'Cancel'}
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