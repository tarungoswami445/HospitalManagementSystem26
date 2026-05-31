import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllPatients } from "../../services/patientService";
import { getAllDoctors } from "../../services/doctorService";
import { getRooms } from "../../services/roomService";
import { getAllBeds } from "../../services/bedService";

import {
  getAllAdmissions,
  saveAdmission,
  deleteAdmission,
  updateAdmission
} from "../../services/admissionService";

const Admissions = () => {

  const [admissions, setAdmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
const [beds, setBeds] = useState([]);
const [patients, setPatients] = useState([]);
const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({

    admitDate: "",
    dischargeDate: "",
    status: "",
patientId: "",
doctorId: "",
roomId: "",
bedId: ""

  });
  const loadPatients = async () => {
  const res = await getAllPatients();
  setPatients(res.data);
};

const loadDoctors = async () => {
  const res = await getAllDoctors();
  setDoctors(res.data);
};

const loadRooms = async () => {
  const res = await getRooms();
  setRooms(res.data);
};

const loadBeds = async () => {
  const res = await getAllBeds();
  setBeds(res.data);
};

  // LOAD
  const loadAdmissions = async () => {
    try {
      const response = await getAllAdmissions();
      setAdmissions(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  loadAdmissions();
  loadPatients();
  loadDoctors();
  loadRooms();
  loadBeds();
}, []);

  // SEARCH
const filteredAdmissions = admissions.filter((a) => {

  const s = search.toLowerCase();

  return (
    a.id?.toString().includes(s) ||
    a.status?.toLowerCase().includes(s) ||
    a.patientName?.toLowerCase().includes(s) ||
    a.doctorName?.toLowerCase().includes(s) ||
    a.roomNumber?.toLowerCase().includes(s) ||
    a.bedNumber?.toLowerCase().includes(s)
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
        await updateAdmission(editingId, formData);
        toast.success("Admission Updated");
      } else {
        await saveAdmission(formData);
        toast.success("Admission Added");
      }

      setEditingId(null);
      loadAdmissions();

    setFormData({
  admitDate: "",
  dischargeDate: "",
  status: "",
  patientId: "",
  doctorId: "",
  roomId: "",
  bedId: ""
});

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteAdmission(id);
      toast.success("Deleted Successfully");
      loadAdmissions();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // EDIT
  const handleEdit = (a) => {

  setEditingId(a.id);

  setFormData({
    admitDate: a.admitDate,
    dischargeDate: a.dischargeDate,
    status: a.status,
    patientId: a.patientId,
    doctorId: a.doctorId,
    roomId: a.roomId,
    bedId: a.bedId
  });
};

  if (loading) {
    return <p className="p-6">Loading admissions...</p>;
  }

  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold mb-6">
        Admissions Management
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search admissions..."
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

         <select
  name="roomId"
  value={formData.roomId}
  onChange={handleChange}
  className="border p-3 rounded-lg"
>
  <option value="">Select Room</option>

  {rooms.map((room) => (
    <option key={room.id} value={room.id}>
      Room {room.roomNumber}
    </option>
  ))}
</select>

         <select
  name="bedId"
  value={formData.bedId}
  onChange={handleChange}
  className="border p-3 rounded-lg"
>
  <option value="">Select Bed</option>

  {beds.map((bed) => (
    <option key={bed.id} value={bed.id}>
      {bed.bedNumber}
    </option>
  ))}
</select>

          <input
            type="date"
            name="admitDate"
            value={formData.admitDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="dischargeDate"
            value={formData.dischargeDate}
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

        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5"
        >
          {editingId ? "Update Admission" : "Add Admission"}
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
              <th className="p-4">Room</th>
              <th className="p-4">Bed</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredAdmissions.map((a) => (
              <tr key={a.id} className="border-b text-center">

                <td className="p-4">{a.id}</td>
                <td className="p-4">{a.patientName}</td>
                <td className="p-4">{a.doctorName}</td>
                <td className="p-4">{a.roomNumber}</td>
                <td className="p-4">{a.bedNumber}</td>
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

export default Admissions;