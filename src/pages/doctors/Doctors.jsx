import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllDoctors,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  getAllUsers,
  getAllDepartments
} from "../../services/doctorService";

import {
  FaUserMd,
  FaSearch,
  FaTrash,
  FaEdit,
  FaStethoscope,
  FaMoneyBillWave,
  FaGraduationCap,
  FaHospital
} from "react-icons/fa";

const Doctors = () => {
  const [editingId, setEditingId] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
const [formData, setFormData] = useState({
  specialization: "",
  qualification: "",
  experienceYears: "",
  consultationFee: "",
  userId: "",
  departmentId: "",
   departmentId: ""
});
const loadUsers = async () => {
  try {

    const response = await getAllUsers();

    const doctorUsers = response.data.filter(
      user => user.roleName === "DOCTOR"
    );

    setUsers(doctorUsers);

  } catch (error) {

    console.log(error);

  }
};

const loadDepartments = async () => {
  try {
    const response = await getAllDepartments();
    setDepartments(response.data);
  } catch (error) {
    console.log(error);
  }
};

  // =============================
  // LOAD DOCTORS
  // =============================

  const loadDoctors = async () => {

    try {

      setLoading(true);

      const response = await getAllDoctors();

      setDoctors(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load doctors");

    } finally {

      setLoading(false);
    }
  };
useEffect(() => {
  loadDoctors();
  loadUsers();
  loadDepartments();
}, []);


const handleEdit = (doctor) => {

  setEditingId(doctor.id);

  setFormData({
    specialization: doctor.specialization,
    qualification: doctor.qualification,
    experienceYears: doctor.experienceYears,
    consultationFee: doctor.consultationFee,
    userId: doctor.userId,
    departmentId: doctor.departmentId
  });
};

  // =============================
  // HANDLE INPUT
  // =============================

const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};
  // =============================
  // SAVE DOCTOR
  // =============================

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editingId) {

      await updateDoctor(editingId, formData);

      toast.success("Doctor Updated Successfully");

    } else {

      await saveDoctor(formData);

      toast.success("Doctor Created Successfully");
    }

    loadDoctors();

    setEditingId(null);

    setFormData({
      specialization: "",
      qualification: "",
      experienceYears: "",
      consultationFee: "",
      userId: "",
      departmentId: ""
    });

  } catch (error) {

    console.log(error);

    toast.error("Operation Failed");
  }
};
  // =============================
  // DELETE
  // =============================

  const handleDelete = async (id) => {

    try {

      await deleteDoctor(id);

      toast.success("Doctor Deleted");

      loadDoctors();

    } catch (error) {

      console.log(error);

      toast.error("Delete Failed");
    }
  };

  // =============================
  // SEARCH FILTER
  // =============================

  const filteredDoctors = doctors.filter((doctor) =>

    doctor.specialization
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    doctor.qualification
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // =============================
  // LOADING
  // =============================

  if (loading) {

    return (

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

        {[1,2,3,4,5,6].map((i) => (

          <div
            key={i}
            className="h-40 rounded-2xl bg-gray-300 animate-pulse"
          ></div>

        ))}

      </div>
    );
  }

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <FaUserMd className="text-blue-600" />
            Doctors Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage hospital doctors
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-white p-5 rounded-2xl shadow-md mb-8">

        <div className="flex items-center border rounded-xl px-4 py-3">

          <FaSearch className="text-gray-400 mr-3" />

          <input
            type="text"
            placeholder="Search by specialization or qualification..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* FORM */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Doctor
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* USER ID */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              User ID
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaUserMd className="text-gray-400 mr-3" />
<select
  name="userId"
  value={formData.userId}
  onChange={handleChange}
  className="w-full outline-none"
  required
>
  <option value="">Select Doctor User</option>

  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.fullName} (ID: {user.id})
    </option>
  ))}
</select>

            </div>

          </div>

          {/* DEPARTMENT ID */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Department ID
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaHospital className="text-gray-400 mr-3" />

            <select
  name="departmentId"
  value={formData.departmentId}
  onChange={handleChange}
  className="w-full outline-none"
  required
>
  <option value="">Select Department</option>

  {departments.map((dept) => (
    <option key={dept.id} value={dept.id}>
      {dept.departmentName} (ID: {dept.id})
    </option>
  ))}
</select>

            </div>

          </div>

          {/* SPECIALIZATION */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Specialization
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaStethoscope className="text-gray-400 mr-3" />

              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Cardiologist"
                className="w-full outline-none"
                required
              />

            </div>

          </div>

          {/* QUALIFICATION */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Qualification
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaGraduationCap className="text-gray-400 mr-3" />

              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="MBBS, MD"
                className="w-full outline-none"
                required
              />

            </div>

          </div>

          {/* EXPERIENCE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Experience Years
            </label>

            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="5"
              className="w-full border rounded-xl px-4 py-3 outline-none"
              required
            />

          </div>

          {/* FEE */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Consultation Fee
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaMoneyBillWave className="text-gray-400 mr-3" />

              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                placeholder="500"
                className="w-full outline-none"
                required
              />

            </div>

          </div>

          {/* BUTTON */}

          <div className="md:col-span-2">

           <button
  type="submit"
  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
>
  {editingId ? "Update Doctor" : "Create Doctor"}
</button>

          </div>

        </form>

      </div>

      {/* DOCTOR TABLE */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-gray-800">
            Doctors List
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-900 text-white">

              <tr>

                <th className="p-4">ID</th>
                <th className="p-4">Specialization</th>
                <th className="p-4">Qualification</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Fee</th>
                <th className="p-4">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredDoctors.map((doctor) => (

                <tr
                  key={doctor.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 text-center font-semibold">
                    {doctor.id}
                  </td>

                  <td className="p-4 text-center">
                    {doctor.specialization}
                  </td>

                  <td className="p-4 text-center">
                    {doctor.qualification}
                  </td>

                  <td className="p-4 text-center">
                    {doctor.experienceYears} Years
                  </td>

                  <td className="p-4 text-center">
                    ₹ {doctor.consultationFee}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                     <button
  onClick={() => handleEdit(doctor)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
>
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Doctors;
