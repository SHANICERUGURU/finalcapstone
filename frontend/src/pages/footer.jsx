import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary text-white py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side */}
        <p className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} Medical Records System. All Rights Reserved.
        </p>

        {/* Right side links */}
        <ul className="list-unstyled d-flex mb-0">
          <li className="ms-3">
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
          </li>
          <li className="ms-3">
            <Link to="/dashboard" className="text-white text-decoration-none">
              Dashboard
            </Link>
          </li>
          <li className="ms-3">
            <Link to="/appointments" className="text-white text-decoration-none">
              Appointments
            </Link>
          </li>
          <li className="ms-3">
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
          </li>
          <li className="ms-3">
            <Link to="/register" className="text-white text-decoration-none">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
