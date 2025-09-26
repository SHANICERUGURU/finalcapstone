import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          Medical Records
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {user ? (
              <>
                {/* User Welcome */}
                <li className="nav-item">
                  <span className="nav-link text-light fw-medium">
                    Welcome, {user.full_name || user.username || "User"}
                  </span>
                </li>

                {/* Common Links */}
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/">
                    Home
                  </Link>
                </li>

                {/* Patient Links */}
                {user.role === "PATIENT" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/appointments">
                        Appointments
                      </Link>
                    </li>
                  </>
                )}

                {/* Doctor Links */}
                {user.role === "DOCTOR" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/patientlist">
                        Patients
                      </Link>
                    </li>
                  </>
                )}

                {/* Logout */}
                <li className="nav-item">
                  <button
                    onClick={onLogout}
                    className="btn btn-outline-light btn-sm ms-lg-3 fw-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Guest Links */}
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;