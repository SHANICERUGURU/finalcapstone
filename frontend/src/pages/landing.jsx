import React from "react";
import { Link } from "react-router-dom";
import medicalIllustration from "../assets/medicalillustration.png";
import recordsImg from "../assets/records.png";
import appointmentsImg from "../assets/appointments.png";
import supportImg from "../assets/support.png";

const Landing = () => {
  return (
    <div className="container-fluid px-0 mt-5">
      {/* Hero Section */}
      <div className="row align-items-center py-5">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold text-primary mb-3">
            Welcome to the Documed Medical Records System
          </h1>
          <p className="lead mb-4">
            Your health, our priority. Manage your medical records and
            appointments with our secure, easy-to-use platform.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link
              className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
              to="/register"
            >
              Get Started <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link
              className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill"
              to="/login"
            >
              Already have an account?
            </Link>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          <img
            src={medicalIllustration}
            alt="Medical illustration"
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="row mt-5 py-5">
        <div className="col-12 text-center mb-5">
          <h2 className="fw-bold">Why Choose Our Platform</h2>
          <p className="text-muted">
            We provide everything you need to manage your healthcare
          </p>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary rounded-circle p-3 mb-3 mx-auto">
                <img
                  src={recordsImg}
                  alt="Medical Records"
                  className="img-fluid"
                  style={{ maxHeight: "60px" }}
                />
              </div>
              <h4 className="card-title">Secure Records</h4>
              <p className="card-text">
                Your medical records are stored securely with encryption and can
                be accessed anytime from anywhere.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-success rounded-circle p-3 mb-3 mx-auto">
                <img
                  src={appointmentsImg}
                  alt="Appointments"
                  className="img-fluid"
                  style={{ maxHeight: "60px" }}
                />
              </div>
              <h4 className="card-title">Easy Appointments</h4>
              <p className="card-text">
                Schedule, reschedule, or cancel appointments effortlessly in
                just a few clicks.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm hover-shadow">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-info rounded-circle p-3 mb-3 mx-auto">
                <img
                  src={supportImg}
                  alt="Support"
                  className="img-fluid"
                  style={{ maxHeight: "60px" }}
                />
              </div>
              <h4 className="card-title">24/7 Support</h4>
              <p className="card-text">
                Our dedicated support team is here to help you with any
                questions or issues at any time of day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row mt-5 py-5 text-center">
        <div className="col-12">
          <h2 className="fw-bold mb-3">
            Ready to Take Control of Your Healthcare?
          </h2>
          <p className="lead mb-4">
            Join thousands of patients who are already managing their health
            with our system
          </p>
          <Link
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
            to="/register"
          >
            Create Your Account Now <i className="bi bi-arrow-right ms-2"></i>
          </Link>
          <p className="mt-3">
            <Link className="btn btn-link" to="/login">
              Already have an account? Log in here.
            </Link>
          </p>
        </div>
      </div>

      {/* Extra CSS */}
      <style>
        {`
          .hover-shadow {
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
          }
          .feature-icon {
            width: 90px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .testimonial-card {
            transition: transform 0.3s;
          }
          .testimonial-card:hover {
            transform: scale(1.03);
          }
        `}
      </style>
    </div>
  );
};

export default Landing;
