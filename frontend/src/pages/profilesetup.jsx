import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

function ProfileSetup() {
  const [formData, setFormData] = useState({
    blood_type: "",
    allergies: "",
    chronic_illness: "",
    last_appointment: "",
    emergency_contact_name: "",
    insurance_type: "",
    emergency_contact_phone: "",
    current_medications: "",
    family_medical_history: "",
    last_doctor:"",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('access');

  useEffect(() => {
    if (!token) {
      setErrorMessage("You must be logged in to setup your profile.");
    }
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage("Missing authentication token. Please log in again.");
      setLoading(false);
      return;
    }

    // Basic validation
    if (!formData.blood_type && !formData.allergies && !formData.chronic_illness) {
      setErrorMessage("Please fill in at least one of the medical information fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/profiles/patient/setup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
console.log(data)
      if (!res.ok) {
        // Handle different error formats
        if (data.detail) {
          setErrorMessage(data.detail);
        } else if (data.errors) {
          setErrorMessage(Object.values(data.errors).join(", "));
        } else {
          setErrorMessage("Error saving profile. Please try again.");
        }
      } else {
        setSuccessMessage("Patient profile created successfully! Redirecting to dashboard...");
        
        // Clear form
        setFormData({
          blood_type: "",
          allergies: "",
          chronic_illness: "",
          last_appointment: "",
          emergency_contact_name: "",
          insurance_type: "",
          emergency_contact_phone: "",
          current_medications: "",
          family_medical_history: "",
          last_doctor:"",
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Profile setup error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "#f8f9fa",
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Main content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div style={{ width: "100%", maxWidth: "900px" }}>
          <div className="card shadow-lg border-0 w-100 my-4">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0">Patient Profile Setup</h2>
              <p className="mb-0 mt-2">Complete your medical information for better healthcare</p>
            </div>
            <div className="card-body p-5">
              
              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {errorMessage}
                  <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Medical Information Section */}
                  <div className="col-md-6">
                    <h5 className="text-primary mb-4">Medical Information</h5>
                    
                    {/* Blood Type */}
                    <div className="mb-3">
                      <label className="form-label">Blood Type</label>
                      <select
                        className="form-select"
                        name="blood_type"
                        value={formData.blood_type}
                        onChange={handleChange}
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
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
                        placeholder="e.g., Penicillin, Peanuts, Dust"
                      />
                      <div className="form-text">List any known allergies, separated by commas</div>
                    </div>

                    {/* Chronic Conditions */}
                    <div className="mb-3">
                      <label className="form-label">Chronic Conditions</label>
                      <input
                        type="text"
                        className="form-control"
                        name="chronic_illness"
                        value={formData.chronic_illness}
                        onChange={handleChange}
                        placeholder="e.g., Diabetes, Hypertension, Asthma"
                      />
                      <div className="form-text">List any chronic medical conditions</div>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-3">
                      <label className="form-label">Last appointment</label>
                      <input
                        type="date"
                        className="form-control"
                        name="last_appointment"
                        value={formData.last_appointment}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Contact & Insurance Section */}
                  <div className="col-md-6">
                    <h5 className="text-primary mb-4">Contact & Insurance</h5>
                    
                    {/* Emergency Contact */}
                    <div className="mb-3">
                      <label className="form-label">Emergency Contact</label>
                      <input
                        type="text"
                        className="form-control"
                        name="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={handleChange}
                        placeholder="Name and Phone Number"
                      />
                    </div>

                    {/* Insurance Provider */}
                    <div className="mb-3">
                      <label className="form-label">Insurance Provider</label>
                      <input
                        type="text"
                        className="form-control"
                        name="insurance_type"
                        value={formData.insurance_type}
                        onChange={handleChange}
                        placeholder="e.g., Blue Cross, Aetna"
                      />
                    </div>

                    {/* Insurance ID */}
                    <div className="mb-3">
                      <label className="form-label">emergency contact phone number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="emergency_contact_phone"
                        value={formData.emergency_contact_phone}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Primary Care Physician */}
                    <div className="mb-3">
                      <label className="form-label">current medication</label>
                      <input
                        type="text"
                        className="form-control"
                        name="current_medications"
                        value={formData.current_medications}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Pharmacy Information */}
                    <div className="mb-3">
                      <label className="form-label">family medical history</label>
                      <input
                        type="text"
                        className="form-control"
                        name="family_medical_history"
                        value={formData.family_medical_history}
                        onChange={handleChange}
                        placeholder="family medical history"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">last doctor seen</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_doctor"
                        value={formData.last_doctor}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-4" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Profile...
                      </>
                    ) : (
                      "Create Patient Profile"
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => navigate("/dashboard")}
                  >
                    Back to Dashboard
                  </button>
                </div>

                
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="text-center py-4 bg-light border-top mt-auto">
        <small className="text-muted">
          All information is kept confidential and secure. Only essential medical staff will have access to this data.
        </small>
      </footer>
    </div>
  );
}

export default ProfileSetup;