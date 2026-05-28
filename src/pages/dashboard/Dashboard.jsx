import { useEffect, useState } from "react";

import {
  getPatients,
  getDoctors,
  getAppointments,
  getAdmissions,
  getPrescriptions,
  getMedicalRecords,
  getRooms,
  getEmergencyRequests
} from "../../services/dashboardService";

import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaProcedures,
  FaNotesMedical,
  FaFileMedical,
  FaBed,
  FaAmbulance
} from "react-icons/fa";

const Dashboard = () => {

  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [admissions, setAdmissions] = useState(0);
  const [prescriptions, setPrescriptions] = useState(0);
  const [medicalRecords, setMedicalRecords] = useState(0);

  // 🔥 NEW STATES
  const [rooms, setRooms] = useState(0);
  const [emergencyRequests, setEmergencyRequests] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const [
        patientRes,
        doctorRes,
        appointmentRes,
        admissionRes,
        prescriptionRes,
        medicalRecordRes,
        roomRes,
        emergencyRes
      ] = await Promise.all([

        getPatients(page, size),
        getDoctors(page, size),
        getAppointments(page, size),
        getAdmissions(page, size),
        getPrescriptions(),
        getMedicalRecords(),

        // 🔥 NEW API
        getRooms(),
        getEmergencyRequests()

      ]);

      setPatients(
        patientRes.data?.length ||
        patientRes.data?.content?.length ||
        patientRes.data?.totalElements ||
        0
      );

      setDoctors(
        doctorRes.data?.length ||
        doctorRes.data?.content?.length ||
        doctorRes.data?.totalElements ||
        0
      );

      setAppointments(
        appointmentRes.data?.length ||
        appointmentRes.data?.content?.length ||
        appointmentRes.data?.totalElements ||
        0
      );

      setAdmissions(
        admissionRes.data?.length ||
        admissionRes.data?.content?.length ||
        admissionRes.data?.totalElements ||
        0
      );

      setPrescriptions(
        prescriptionRes.data?.length ||
        prescriptionRes.data?.content?.length ||
        prescriptionRes.data?.totalElements ||
        0
      );

      setMedicalRecords(
        medicalRecordRes.data?.length ||
        medicalRecordRes.data?.content?.length ||
        medicalRecordRes.data?.totalElements ||
        0
      );

      // 🔥 NEW COUNTS
      setRooms(
        roomRes.data?.length ||
        roomRes.data?.content?.length ||
        roomRes.data?.totalElements ||
        0
      );

      setEmergencyRequests(
        emergencyRes.data?.length ||
        emergencyRes.data?.content?.length ||
        emergencyRes.data?.totalElements ||
        0
      );

      setError("");

    } catch (err) {

      console.log(err);
      setError("Failed to load dashboard data");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [page]);

  const Card = ({ title, value, icon: Icon, color }) => (

    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl ${color}`}
    >

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-semibold opacity-90">
            {title}
          </h2>

          <p className="text-4xl font-bold mt-2">
            {loading ? "..." : value}
          </p>

        </div>

        <div className="text-4xl opacity-80">
          <Icon />
        </div>

      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>

    </div>
  );

  return (

    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Hospital Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of hospital activities in real time
        </p>

      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Patients"
          value={patients}
          icon={FaUserInjured}
          color="bg-gradient-to-r from-blue-500 to-blue-700"
        />

        <Card
          title="Doctors"
          value={doctors}
          icon={FaUserMd}
          color="bg-gradient-to-r from-green-500 to-green-700"
        />

        <Card
          title="Appointments"
          value={appointments}
          icon={FaCalendarCheck}
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
        />

        <Card
          title="Admissions"
          value={admissions}
          icon={FaProcedures}
          color="bg-gradient-to-r from-purple-500 to-pink-600"
        />

        <Card
          title="Prescriptions"
          value={prescriptions}
          icon={FaNotesMedical}
          color="bg-gradient-to-r from-indigo-500 to-purple-700"
        />

        <Card
          title="Medical Records"
          value={medicalRecords}
          icon={FaFileMedical}
          color="bg-gradient-to-r from-cyan-500 to-blue-700"
        />

        {/* 🔥 NEW CARDS */}

        <Card
          title="Rooms"
          value={rooms}
          icon={FaBed}
          color="bg-gradient-to-r from-emerald-500 to-teal-700"
        />

        <Card
          title="Emergency"
          value={emergencyRequests}
          icon={FaAmbulance}
          color="bg-gradient-to-r from-red-500 to-rose-700"
        />

      </div>

    </div>
  );
};

export default Dashboard;