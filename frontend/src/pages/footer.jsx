import React from "react";
import { Link } from "react-router-dom";

function Footer({ user, onLogout }) {
  return (
    <footer className="bg-primary text-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          {/* Copyright */}
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p className="mb-0 text-light">
              &copy; {new Date().getFullYear()} Medical Records System. All Rights Reserved.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-4">
              <Link to="/" className="text-light text-decoration-none small hover-text-white">
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
              <span className="text-light">|</span>
              <a href="#privacy" className="text-light text-decoration-none small hover-text-white">
                Privacy Policy
              </a>
              <span className="text-light">|</span>
              <a href="#terms" className="text-light text-decoration-none small hover-text-white">
                Terms of Service
              </a>
              {user && (
                <>
                  <span className="text-light">|</span>
                  <button
                    onClick={onLogout}
                    className="btn btn-link text-light text-decoration-none small p-0 hover-text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-text-white:hover {
          color: #fff !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
}

export default Footer;