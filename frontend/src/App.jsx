import { useState } from "react";
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
import Appointments from "./pages/appointments";
import ProfileSetup from "./pages/profilesetup";
import PatientList from "./pages/patientlist";
import PatientDetails from "./pages/patientdetails";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar always at the top */}
        <Navbar user={user} onLogout={handleLogout} />

        {/* Main page content */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }/>
               <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }/>
               <Route
              path="/profile/setup"
              element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              }/>
               <Route
              path="/patientlist"
              element={
                <ProtectedRoute>
                  <PatientList />
                </ProtectedRoute>
              }/>
               <Route
              path="/patient/:id"
              element={
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              }/>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
