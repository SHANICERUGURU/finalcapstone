import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand text-white fw-bold" to="/">
          Medical Records
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link text-white fw-semibold">
                    Hello, {user.fullName || user.username || "User"}
                  </span>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/">
                    Home
                  </Link>
                </li>

                {user.role === "patient" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white fw-semibold" to="/dashboard">
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white fw-semibold" to="/appointments">
                        Appointments
                      </Link>
                    </li>
                  </>
                )}

                {user.role === "doctor" && (
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-semibold" to="/patientlist">
                      Manage Patients
                    </Link>
                  </li>
                )}

                {/* Logout */}
                <li className="nav-item">
                  <button
                    onClick={onLogout}
                    className="btn btn-light btn-sm ms-2 fw-semibold"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/register">
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
