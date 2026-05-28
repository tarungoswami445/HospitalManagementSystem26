import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccessDenied from "../pages/accessDenied/AccessDenied";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";

// Dashboards
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DoctorDashboard from "../pages/dashboard/DoctorDashboard";
import PatientDashboard from "../pages/dashboard/PatientDashboard";

// Pages
import Patients from "../pages/patients/Patients";
import Doctors from "../pages/doctors/Doctors";
import Appointments from "../pages/appointments/Appointments";
import Admissions from "../pages/admissions/Admissions";
import MedicalRecords from "../pages/medicalRecords/MedicalRecords";
import Prescriptions from "../pages/prescriptions/Prescriptions";
import EmergencyRequests from "../pages/emergency/EmergencyRequests";
import RoomList from "../pages/rooms/RoomList";
import Register from "../pages/auth/Register";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>
        <Route
  path="/register"
  element={<Register />}
/>

        <Route
  path="/access-denied"
  element={<AccessDenied />}
/>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="patients"
            element={<Patients />}
          />

          <Route
            path="doctors"
            element={<Doctors />}
          />

          <Route
            path="appointments"
            element={<Appointments />}
          />

          <Route
            path="admissions"
            element={<Admissions />}
          />

          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

          <Route
            path="emergency-requests"
            element={<EmergencyRequests />}
          />

          <Route
            path="rooms"
            element={<RoomList />}
          />

        </Route>

        {/* ================= DOCTOR ROUTES ================= */}

        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<DoctorDashboard />}
          />

          <Route
            path="patients"
            element={<Patients />}
          />

          <Route
            path="appointments"
            element={<Appointments />}
          />

          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

        </Route>

        {/* ================= PATIENT ROUTES ================= */}

        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<PatientDashboard />}
          />

          <Route
            path="appointments"
            element={<Appointments />}
          />

          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

        </Route>

        {/* ================= DEFAULT ================= */}

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;