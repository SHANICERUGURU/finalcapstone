import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("patient");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    email,
                    phone_number: phoneNumber,
                    gender,
                    date_of_birth: dateOfBirth,
                    password,
                    confirm_password: confirmPassword,
                    role,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setErrorMessage(data.detail || JSON.stringify(data));
                return;
            }

            navigate("/login");
        } catch (error) {
            setErrorMessage("An error occurred during registration. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center "
            style={{
                height: "100vh",
                width: "100vw",
                backgroundImage: "url(/assets/Images/home.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* dark overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            {/* card */}
            <div
                className="card shadow-lg p-4 overflow-auto position-relative"
                style={{
                    width: "100%",
                    maxWidth: "800px",
                    maxHeight: "90vh",
                }}
            >
                <h2 className="text-center mb-4">Register</h2>

                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input
                                type="date"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-4"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center mt-3">
                        Already registered?{" "}
                        <Link to="/login" className="text-primary fw-bold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
