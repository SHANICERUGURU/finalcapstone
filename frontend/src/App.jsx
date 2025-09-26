import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/protectedroutes";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import Appointments from "./pages/appointment";
import ProfileSetup from "./pages/profilesetup";
import PatientList from "./pages/patientlist";
import PatientDetails from "./pages/patientdetails";
import DoctorRegistration from "./pages/doctorregistration";
import PatientEditForm from "./pages/patienteditform";
import api from "./api";
import { ACCESS_TOKEN } from "./constants";

function RegisterandLogout() {
  localStorage.clear();
  return <Register />;
}

function Logout({ setUser }) {
  localStorage.clear();
  setUser(null);
  return <Navigate to="/" />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      api.get("/dashboard/")
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error("Failed to load user:", error);
          localStorage.clear();
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/logout" element={<Logout setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<RegisterandLogout />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
             <Route
              path="/patienteditform/:id"
              element={
                <ProtectedRoute>
                  <PatientEditForm />
                </ProtectedRoute>
              }
            />
            {/* Profile Setup Routes */}
            <Route
              path="/profile-setup"
              element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-profile-setup"  
              element={
                <ProtectedRoute>
                  <DoctorRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patientlist"
              element={
                <ProtectedRoute>
                  <PatientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/:id"
              element={
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;