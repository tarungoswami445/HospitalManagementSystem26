import { useEffect, useState } from "react";

import {
  getAppointments,
  getPatients,
  getMedicalRecords,
} from "../../services/dashboardService";

import {
  FaCalendarCheck,
  FaUserInjured,
  FaFileMedical,
} from "react-icons/fa";

const DoctorDashboard = () => {

  const [appointments, setAppointments] = useState(0);
  const [patients, setPatients] = useState(0);
  const [records, setRecords] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          appointmentRes,
          patientRes,
          recordRes
        ] = await Promise.all([
          getAppointments(),
          getPatients(),
          getMedicalRecords()
        ]);

        setAppointments(
          appointmentRes.data?.length ||
          appointmentRes.data?.content?.length ||
          0
        );

        setPatients(
          patientRes.data?.length ||
          patientRes.data?.content?.length ||
          0
        );

        setRecords(
          recordRes.data?.length ||
          recordRes.data?.content?.length ||
          0
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    loadData();

  }, []);

  const Card = ({ title, value, icon: Icon, color }) => (

    <div className={`rounded-2xl p-6 shadow-xl text-white ${color}`}>

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <p className="text-4xl font-bold mt-3">
            {loading ? "..." : value}
          </p>

        </div>

        <Icon className="text-5xl opacity-80" />

      </div>

    </div>
  );

  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Doctor Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Manage patients and appointments
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card
          title="Appointments"
          value={appointments}
          icon={FaCalendarCheck}
          color="bg-gradient-to-r from-blue-500 to-blue-700"
        />

        <Card
          title="Patients"
          value={patients}
          icon={FaUserInjured}
          color="bg-gradient-to-r from-green-500 to-green-700"
        />

        <Card
          title="Medical Records"
          value={records}
          icon={FaFileMedical}
          color="bg-gradient-to-r from-purple-500 to-pink-600"
        />

      </div>

    </div>
  );
};

export default DoctorDashboard;