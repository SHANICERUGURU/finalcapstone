import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants"; 

function Appointments() {
  const [user, setUser] = useState(null); 
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

  const getAuthHeaders = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const appRes = await fetch("http://127.0.0.1:8000/api/appointments/", {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch("http://127.0.0.1:8000/api/appointments/", { 
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
    <div className="container-fluid py-4 w-100">
      <div className="row w-100">
        <div className="col-12">
          {user && patient ? (
            <>
              <h2 className="mb-4">Welcome, {patient.user.username}!</h2>
              {/* rest of your JSX unchanged */}
            </>
          ) : user ? (
            <div className="alert alert-warning w-100">
              <h4 className="alert-heading">Profile Setup Required</h4>
              <p>You need to complete your patient profile before accessing appointments.</p>
              <hr />
              <Link to="/profile_setup" className="btn btn-primary">
                Complete Profile Setup
              </Link>
            </div>
          ) : (
            <div className="alert alert-danger w-100">
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
