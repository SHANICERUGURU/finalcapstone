import React, { useState } from "react";

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    specialty: "",
    hospital: "",
    license_number: "",
  });

  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessages([]);

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://127.0.0.1:8000/doctor/setup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([{ type: "success", text: "Doctor registered successfully!" }]);
        setFormData({ specialty: "", hospital: "", license_number: "" });
      } else {
        // Collect Django validation errors
        setErrors(data);
        setMessages([{ type: "danger", text: "Please correct the errors below." }]);
      }
    } catch (error) {
      setMessages([{ type: "danger", text: "Something went wrong. Try again." }]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Enter your details!</h2>

      {/* Flash Messages */}
      {messages.map((msg, index) => (
        <div key={index} className={`alert alert-${msg.type}`}>
          {msg.text}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        {/* Specialty */}
        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">
            Specialty
          </label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            className="form-control"
            value={formData.specialty}
            onChange={handleChange}
          />
          {errors.specialty && (
            <div className="text-danger">{errors.specialty.join(" ")}</div>
          )}
        </div>

        {/* Hospital */}
        <div className="mb-3">
          <label htmlFor="hospital" className="form-label">
            Hospital
          </label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            className="form-control"
            value={formData.hospital}
            onChange={handleChange}
          />
          {errors.hospital && (
            <div className="text-danger">{errors.hospital.join(" ")}</div>
          )}
        </div>

        {/* License Number */}
        <div className="mb-3">
          <label htmlFor="license_number" className="form-label">
            Enter License Number
          </label>
          <input
            type="text"
            id="license_number"
            name="license_number"
            className="form-control"
            value={formData.license_number}
            onChange={handleChange}
          />
          {errors.license_number && (
            <div className="text-danger">{errors.license_number.join(" ")}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default DoctorRegistration;
