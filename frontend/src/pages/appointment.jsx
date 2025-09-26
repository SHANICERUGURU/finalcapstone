import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants"; 

function Appointments() {
  const [user, setUser] = useState(null); 
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [form, setForm] = useState({
    specialty: "",
    date: "",
    time: "",
    doctor: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  };

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch doctors list
  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/doctors/", {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const doctorsData = await res.json();
        setDoctors(doctorsData);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) return;

        // ✅ Fetch user data
        const userRes = await fetch("http://127.0.0.1:8000/api/users/", {
          headers: getAuthHeaders(),
        });

        if (userRes.status === 401) {
          navigate("/login");
          return;
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
          // Check if patient data exists in the response
          if (userData.patient) {
            setPatient(userData.patient);
          }
        }

        // ✅ Fetch appointments
        const appRes = await fetch("http://127.0.0.1:8000/api/appointments/", {
          headers: getAuthHeaders(),
        });

        if (appRes.ok) {
          const appData = await appRes.json();
          setAppointments(appData);
        }

        // ✅ Fetch doctors
        await fetchDoctors();
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Filter doctors when specialty changes
  useEffect(() => {
    if (form.specialty) {
      const filtered = doctors.filter(doctor => 
        doctor.specialty === form.specialty
      );
      setFilteredDoctors(filtered);
      setForm(prev => ({ ...prev, doctor: "" }));
    } else {
      setFilteredDoctors([]);
      setForm(prev => ({ ...prev, doctor: "" }));
    }
  }, [form.specialty, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    
    if (!form.specialty || !form.date || !form.time || !form.doctor) {
      setErrors({ general: "Please fill in all required fields" });
      return;
    }

    try {
      const appointmentData = {
        specialty: form.specialty,
        date: form.date,
        time: form.time,
        doctor: form.doctor,
        reason: form.reason,
      };

      const res = await fetch("http://127.0.0.1:8000/api/appointments/", { 
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(appointmentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData);
        return;
      }

      const newApp = await res.json();
      setAppointments([newApp, ...appointments]);
      setForm({ specialty: "", date: "", time: "", doctor: "", reason: "" });
      setShowBookingForm(false);
      setSuccessMessage("Appointment booked successfully!");
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error submitting appointment:", err);
      setErrors({ general: "Network error. Please try again." });
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/appointments/${appointmentId}/`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });

        if (res.ok) {
          setAppointments(appointments.filter(app => app.id !== appointmentId));
          setSuccessMessage("Appointment cancelled successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          alert("Failed to cancel appointment");
        }
      } catch (err) {
        console.error("Error canceling appointment:", err);
        alert("Error canceling appointment");
      }
    }
  };

  const resetForm = () => {
    setForm({ specialty: "", date: "", time: "", doctor: "", reason: "" });
    setErrors({});
    setShowBookingForm(false);
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
    <div className="container-fluid py-4 w-100">
      <div className="row w-100">
        <div className="col-12 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading appointments...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4 w-100">
      <div className="row w-100">
        <div className="col-12">
          {/* Always show the main content once loading is complete */}
          <div className="card mb-4 bg-light border-0">
            <div className="card-body text-center py-4">
              <h1 className="text-primary mb-2">Welcome to Appointments</h1>
              <h3 className="text-dark">
                {patient?.user_full_name || user?.username || "User"}!
              </h3>
              <p className="text-muted mb-0">Manage your medical appointments here</p>
            </div>
          </div>

          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show">
              {successMessage}
              <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
            </div>
          )}

          {/* Show profile setup warning if user exists but no patient profile */}
          {user && !patient && (
            <div className="alert alert-warning w-100 mb-4">
              <h4 className="alert-heading">Profile Setup Required</h4>
              <p>You need to complete your patient profile before booking appointments.</p>
              <hr />
              <Link to="/profile-setup" className="btn btn-primary">
                Complete Profile Setup
              </Link>
            </div>
          )}

          {/* Only show booking functionality if patient profile exists */}
          {patient ? (
            <>
              <div className="text-center mb-4">
                <button 
                  className="btn btn-primary btn-lg px-4"
                  onClick={() => setShowBookingForm(!showBookingForm)}
                >
                  {showBookingForm ? "Cancel Booking" : "Book New Appointment"}
                </button>
              </div>

              {showBookingForm && (
                <div className="card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Book New Appointment</h5>
                  </div>
                  <div className="card-body">
                    {errors.general && (
                      <div className="alert alert-danger">{errors.general}</div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Specialty *</label>
                          <select
                            name="specialty"
                            className={`form-control ${errors.specialty ? 'is-invalid' : ''}`}
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
                          {errors.specialty && (
                            <div className="invalid-feedback">{errors.specialty}</div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Doctor *</label>
                          <select
                            name="doctor"
                            className={`form-control ${errors.doctor ? 'is-invalid' : ''}`}
                            value={form.doctor}
                            onChange={handleChange}
                            required
                            disabled={!form.specialty}
                          >
                            <option value="">Select Doctor</option>
                            {filteredDoctors.map(doctor => (
                              <option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.user_full_name} - {specialtyOptions.find(s => s.value === doctor.specialty)?.label}
                              </option>
                            ))}
                          </select>
                          {!form.specialty && (
                            <div className="form-text">Please select a specialty first</div>
                          )}
                          {errors.doctor && (
                            <div className="invalid-feedback">{errors.doctor}</div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Date *</label>
                          <input
                            type="date"
                            name="date"
                            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                            value={form.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                          {errors.date && (
                            <div className="invalid-feedback">{errors.date}</div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Time *</label>
                          <input
                            type="time"
                            name="time"
                            className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                            value={form.time}
                            onChange={handleChange}
                            required
                          />
                          {errors.time && (
                            <div className="invalid-feedback">{errors.time}</div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Reason for Visit</label>
                        <textarea
                          name="reason"
                          className="form-control"
                          rows="3"
                          value={form.reason}
                          onChange={handleChange}
                          placeholder="Briefly describe the reason for your appointment..."
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success">
                          Confirm Booking
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : null}

          {/* Appointments List - Show even if no patient profile */}
          <div className="card">
            <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                Your Appointments ({appointments.length})
              </h5>
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
                  <p className="text-muted">
                    {patient 
                      ? "You haven't booked any appointments yet." 
                      : "Complete your profile to book appointments."
                    }
                  </p>
                  {patient && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowBookingForm(true)}
                    >
                      Book Your First Appointment
                    </button>
                  )}
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
                      {appointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td>{new Date(appointment.date).toLocaleDateString()}</td>
                          <td>{appointment.time}</td>
                          <td>Dr. {appointment.doctor_name}</td>
                          <td>
                            {specialtyOptions.find(s => s.value === appointment.specialty)?.label || appointment.specialty}
                          </td>
                          <td>{appointment.reason || "Not specified"}</td>
                          <td>
                            <span className={`badge ${
                              appointment.status === 'confirmed' ? 'bg-success' :
                              appointment.status === 'pending' ? 'bg-warning' : 
                              appointment.status === 'cancelled' ? 'bg-danger' : 'bg-secondary'
                            }`}>
                              {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => cancelAppointment(appointment.id)}
                              disabled={appointment.status === 'cancelled'}
                            >
                              {appointment.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
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