import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllPatients } from "../../services/patientService";
import { getAllDoctors } from "../../services/doctorService";

import {
  getAllAppointments,
  saveAppointment,
  deleteAppointment,
  updateAppointment
} from "../../services/appointmentService";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [patients, setPatients] = useState([]);
const [doctors, setDoctors] = useState([]);


const [formData, setFormData] = useState({
  appointmentDate: "",
  appointmentTime: "",
  status: "",
  symptoms: "",
  tokenNumber: "",
  patientId: "",
  doctorId: ""
});
const loadPatients = async () => {
  try {
    const response = await getAllPatients();
    setPatients(response.data);
  } catch (error) {
    console.log(error);
  }
};

const loadDoctors = async () => {
  try {
    const response = await getAllDoctors();
    setDoctors(response.data);
  } catch (error) {
    console.log(error);
  }
};

  // LOAD APPOINTMENTS
  const loadAppointments = async () => {
  try {
    const response = await getAllAppointments();

    const data =
      Array.isArray(response.data)
        ? response.data
        : response.data?.content
        ? response.data.content
        : response.data?.data
        ? response.data.data
        : [];

    setAppointments(data);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  loadAppointments();
  loadPatients();
  loadDoctors();
}, []);

  // SEARCH FILTER (IMPORTANT)
 const filteredAppointments = appointments.filter((a) => {

  const searchText = search.toLowerCase();

  return (
    a.status?.toLowerCase().includes(searchText) ||
  a.patientName?.toLowerCase().includes(searchText) ||
a.doctorName?.toLowerCase().includes(searchText)  ||
    a.appointmentDate?.toString().includes(searchText) ||
    a.tokenNumber?.toString().includes(searchText)
  );
});

  // HANDLE INPUT
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};

  // SUBMIT (ADD + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        await updateAppointment(editingId, formData);
        toast.success("Appointment Updated");
      } else {
        await saveAppointment(formData);
        toast.success("Appointment Added");
      }

      setEditingId(null);
      loadAppointments();

     setFormData({
  appointmentDate: "",
  appointmentTime: "",
  status: "",
  symptoms: "",
  tokenNumber: "",
  patientId: "",
  doctorId: ""
});

    } catch (error) {
      console.log(error);
      toast.error("API Error");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      toast.success("Deleted");
      loadAppointments();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // EDIT (IMPORTANT FIX)
  const handleEdit = (a) => {
    setEditingId(a.id);

    setFormData({
      appointmentDate: a.appointmentDate,
      appointmentTime: a.appointmentTime,
      status: a.status,
      symptoms: a.symptoms,
      tokenNumber: a.tokenNumber,
   patientId: a.patientId || "",
doctorId: a.doctorId || ""
    });
  };

  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold mb-6">
        Appointment Management
      </h1>

      {/* SEARCH BOX (FIXED) */}
      <input
  type="text"
  placeholder="Search appointments..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 border rounded-lg mb-4"
/>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >

        <div className="grid grid-cols-2 gap-4">
<select
  name="patientId"
  value={formData.patientId}
  onChange={handleChange}
  className="border p-3 rounded-lg"
>
  <option value="">Select Patient</option>

  {patients.map((patient) => (
    <option key={patient.id} value={patient.id}>
      {patient.userName}
    </option>
  ))}
</select>

         <select
  name="doctorId"
  value={formData.doctorId}
  onChange={handleChange}
  className="border p-3 rounded-lg"
>
  <option value="">Select Doctor</option>

  {doctors.map((doctor) => (
    <option key={doctor.id} value={doctor.id}>
      {doctor.userName}
    </option>
  ))}
</select>

          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="tokenNumber"
            placeholder="Token Number"
            value={formData.tokenNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          name="symptoms"
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5"
        >
          {editingId ? "Update Appointment" : "Add Appointment"}
        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredAppointments.map((a) => (
              <tr key={a.id} className="border-b text-center">

                <td className="p-4">{a.id}</td>
              <td className="p-4">{a.patientName}</td>
              <td className="p-4">{a.doctorName}</td>
                <td className="p-4">{a.appointmentDate}</td>
                <td className="p-4">{a.appointmentTime}</td>
                <td className="p-4">{a.status}</td>

                <td className="p-4 flex gap-2 justify-center">

                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Appointments;