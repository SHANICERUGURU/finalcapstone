import { useState } from "react";

function ProfileSetup() {
  const [formData, setFormData] = useState({
    blood_type: "",
    allergies: "",
    chronic_illness: "",
    last_appointment: "",
    last_doctor: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    insurance_type: "",
    current_medications: "",
    family_medical_history: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("http://127.0.0.1:8000/profile/setup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // include auth token if your backend requires authentication
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.detail || "Error saving profile.");
      } else {
        setSuccessMessage("Profile saved successfully!");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Enter your details!</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Blood Type */}
        <div className="mb-3">
          <label className="form-label">Blood Type</label>
          <input
            type="text"
            className="form-control"
            name="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
          />
        </div>

        {/* Allergies */}
        <div className="mb-3">
          <label className="form-label">Allergies</label>
          <input
            type="text"
            className="form-control"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        {/* Chronic Illness */}
        <div className="mb-3">
          <label className="form-label">Chronic Conditions</label>
          <input
            type="text"
            className="form-control"
            name="chronic_illness"
            value={formData.chronic_illness}
            onChange={handleChange}
          />
        </div>

        {/* Last Appointment */}
        <div className="mb-3">
          <label className="form-label">Last Appointment</label>
          <input
            type="date"
            className="form-control"
            name="last_appointment"
            value={formData.last_appointment}
            onChange={handleChange}
          />
        </div>

        {/* Last Doctor */}
        <div className="mb-3">
          <label className="form-label">Last Doctor</label>
          <input
            type="text"
            className="form-control"
            name="last_doctor"
            value={formData.last_doctor}
            onChange={handleChange}
          />
        </div>

        {/* Emergency Contact Name */}
        <div className="mb-3">
          <label className="form-label">Emergency Contact Name</label>
          <input
            type="text"
            className="form-control"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
          />
        </div>

        {/* Emergency Contact Phone */}
        <div className="mb-3">
          <label className="form-label">Emergency Contact Phone</label>
          <input
            type="tel"
            className="form-control"
            name="emergency_contact_phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
          />
        </div>

        {/* Insurance Type */}
        <div className="mb-3">
          <label className="form-label">Insurance Type</label>
          <input
            type="text"
            className="form-control"
            name="insurance_type"
            value={formData.insurance_type}
            onChange={handleChange}
          />
        </div>

        {/* Current Medications */}
        <div className="mb-3">
          <label className="form-label">Current Medications</label>
          <input
            type="text"
            className="form-control"
            name="current_medications"
            value={formData.current_medications}
            onChange={handleChange}
          />
        </div>

        {/* Family Medical History */}
        <div className="mb-3">
          <label className="form-label">Family Medical History</label>
          <input
            type="text"
            className="form-control"
            name="family_medical_history"
            value={formData.family_medical_history}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
