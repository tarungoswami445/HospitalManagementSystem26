import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllDoctors,
  saveDoctor,
  deleteDoctor,
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

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    specialization: "",
    qualification: "",
    experienceYears: "",
    consultationFee: "",
    user: { id: "" },
    department: { id: "" }
  });

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
  }, []);

  // =============================
  // HANDLE INPUT
  // =============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "userId") {

      setFormData({
        ...formData,
        user: { id: value }
      });

    }

    else if (name === "departmentId") {

      setFormData({
        ...formData,
        department: { id: value }
      });

    }

    else {

      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // =============================
  // SAVE DOCTOR
  // =============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await saveDoctor(formData);

      toast.success("Doctor Created Successfully");

      loadDoctors();

      setFormData({
        specialization: "",
        qualification: "",
        experienceYears: "",
        consultationFee: "",
        user: { id: "" },
        department: { id: "" }
      });

    } catch (error) {

      console.log(error);

      toast.error("Doctor Creation Failed");
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

              <input
                type="number"
                name="userId"
                value={formData.user.id}
                onChange={handleChange}
                placeholder="Enter User ID"
                className="w-full outline-none"
                required
              />

            </div>

          </div>

          {/* DEPARTMENT ID */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Department ID
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaHospital className="text-gray-400 mr-3" />

              <input
                type="number"
                name="departmentId"
                value={formData.department.id}
                onChange={handleChange}
                placeholder="Enter Department ID"
                className="w-full outline-none"
                required
              />

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
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.01] transition duration-300"
            >
              Create Doctor
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





// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//   getAllDoctors,
//   deleteDoctor,
// } from "../../services/doctorService";

// import { registerDoctor } from "../../auth/authService";

// const Doctors = () => {

//   const [doctors, setDoctors] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({

//     fullName: "",
//     email: "",
//     password: "",
//     phone: "",

//     specialization: "",
//     qualification: "",
//     experienceYears: "",
//     consultationFee: "",

//     departmentId: ""
//   });

//   // ================= LOAD DOCTORS =================

//   const loadDoctors = async () => {

//     try {

//       setLoading(true);

//       const response = await getAllDoctors();

//       setDoctors(response.data);

//     } catch (error) {

//       console.log(error);

//     } finally {

//       setLoading(false);
//     }
//   };

//   useEffect(() => {

//     loadDoctors();

//   }, []);

//   // ================= SEARCH + FILTER =================

//   const filteredDoctors = doctors
//     .filter((d) =>
//       d.specialization?.toLowerCase().includes(search.toLowerCase()) ||
//       d.qualification?.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((d) =>
//       filter === "ALL" ? true : d.specialization === filter
//     );

//   // ================= HANDLE INPUT =================

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // ================= REGISTER DOCTOR =================

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       await registerDoctor(formData);

//       toast.success("Doctor Registered Successfully");

//       loadDoctors();

//       setFormData({

//         fullName: "",
//         email: "",
//         password: "",
//         phone: "",

//         specialization: "",
//         qualification: "",
//         experienceYears: "",
//         consultationFee: "",

//         departmentId: ""
//       });

//     } catch (err) {

//       console.log(err);

//       toast.error("Registration Failed");
//     }
//   };

//   // ================= DELETE =================

//   const handleDelete = async (id) => {

//     try {

//       await deleteDoctor(id);

//       toast.success("Doctor Deleted");

//       loadDoctors();

//     } catch {

//       toast.error("Delete Failed");
//     }
//   };

//   // ================= LOADING =================

//   if (loading) {

//     return (

//       <div className="grid grid-cols-3 gap-4 p-6">

//         {[1, 2, 3, 4, 5, 6].map((i) => (

//           <div
//             key={i}
//             className="h-20 bg-gray-300 animate-pulse rounded"
//           ></div>

//         ))}

//       </div>
//     );
//   }

//   return (

//     <div>

//       {/* ================= SEARCH ================= */}

//       <div className="flex gap-3 mb-4 flex-wrap">

//         <input
//           placeholder="Search doctor..."
//           className="border p-2 rounded"
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border p-2"
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="ALL">ALL</option>
//         </select>

//       </div>

//       {/* ================= FORM ================= */}

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md mb-8"
//       >

//         <div className="grid grid-cols-2 gap-4">

//           <input
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Doctor Full Name"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Doctor Email"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="departmentId"
//             value={formData.departmentId}
//             onChange={handleChange}
//             placeholder="Department ID"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="specialization"
//             value={formData.specialization}
//             onChange={handleChange}
//             placeholder="Specialization"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="qualification"
//             value={formData.qualification}
//             onChange={handleChange}
//             placeholder="Qualification"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="experienceYears"
//             value={formData.experienceYears}
//             onChange={handleChange}
//             placeholder="Experience Years"
//             className="border p-3 rounded-lg"
//           />

//           <input
//             name="consultationFee"
//             value={formData.consultationFee}
//             onChange={handleChange}
//             placeholder="Consultation Fee"
//             className="border p-3 rounded-lg"
//           />

//         </div>

//         <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5">

//           Register Doctor

//         </button>

//       </form>

//       {/* ================= TABLE ================= */}

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-gray-900 text-white">

//             <tr>

//               <th>ID</th>
//               <th>Doctor Name</th>
//               <th>Specialization</th>
//               <th>Qualification</th>
//               <th>Experience</th>
//               <th>Fee</th>
//               <th>Action</th>

//             </tr>

//           </thead>

//           <tbody>

//             {filteredDoctors.map((d) => (

//               <tr
//                 key={d.id}
//                 className="text-center border-b"
//               >

//                 <td>{d.id}</td>

//                 <td>{d.user?.fullName}</td>

//                 <td>{d.specialization}</td>

//                 <td>{d.qualification}</td>

//                 <td>{d.experienceYears}</td>

//                 <td>{d.consultationFee}</td>

//                 <td className="p-2">

//                   <button
//                     onClick={() => handleDelete(d.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default Doctors;















// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//   getAllDoctors,
//   registerDoctor,
//   deleteDoctor,
//   // updateDoctor,
// } from "../../services/doctorService";

// const Doctors = () => {

//   const [doctors, setDoctors] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     specialization: "",
//     qualification: "",
//     experienceYears: "",
//     consultationFee: "",
//     user: { id: "" },
//     department: { id: "" }
//   });

//   // LOAD
//   const loadDoctors = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllDoctors();
//       setDoctors(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   // SEARCH + FILTER
//   const filteredDoctors = doctors
//     .filter((d) =>
//       d.specialization?.toLowerCase().includes(search.toLowerCase()) ||
//       d.qualification?.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((d) =>
//       filter === "ALL" ? true : d.specialization === filter
//     );

//   // HANDLE INPUT
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "userId") {
//       setFormData({
//         ...formData,
//         user: { id: value }
//       });
//     } else if (name === "departmentId") {
//       setFormData({
//         ...formData,
//         department: { id: value }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   // SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         await updateDoctor(editingId, formData);
//         toast.success("Doctor Updated");
//       } else {
//         await saveDoctor(formData);
//         toast.success("Doctor Added");
//       }

//       setEditingId(null);
//       loadDoctors();

//       setFormData({
//         specialization: "",
//         qualification: "",
//         experienceYears: "",
//         consultationFee: "",
//         user: { id: "" },
//         department: { id: "" }
//       });

//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     try {
//       await deleteDoctor(id);
//       toast.success("Doctor Deleted");
//       loadDoctors();
//     } catch {
//       toast.error("Delete Failed");
//     }
//   };

//   // EDIT
//   const handleEdit = (d) => {
//     setEditingId(d.id);

//     setFormData({
//       specialization: d.specialization,
//       qualification: d.qualification,
//       experienceYears: d.experienceYears,
//       consultationFee: d.consultationFee,
//       user: { id: d.user?.id || "" },
//       department: { id: d.department?.id || "" }
//     });
//   };

//   // LOADING UI
//   if (loading) {
//     return (
//       <div className="grid grid-cols-3 gap-4 p-6">
//         {[1,2,3,4,5,6].map((i) => (
//           <div key={i} className="h-20 bg-gray-300 animate-pulse rounded"></div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div>

//       {/* SEARCH + FILTER */}
//       <div className="flex gap-3 mb-4 flex-wrap">

//         <input
//           placeholder="Search doctor..."
//           className="border p-2 rounded"
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border p-2"
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="ALL">ALL</option>
//         </select>

//       </div>

//       {/* FORM (UNCHANGED UI) */}
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">

//         <div className="grid grid-cols-2 gap-4">

//           <input name="userId" value={formData.user.id} onChange={handleChange} placeholder="User ID" className="border p-3 rounded-lg" />
//           <input name="departmentId" value={formData.department.id} onChange={handleChange} placeholder="Department ID" className="border p-3 rounded-lg" />
//           <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" className="border p-3 rounded-lg" />
//           <input name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" className="border p-3 rounded-lg" />
//           <input name="experienceYears" value={formData.experienceYears} onChange={handleChange} placeholder="Experience" className="border p-3 rounded-lg" />
//           <input name="consultationFee" value={formData.consultationFee} onChange={handleChange} placeholder="Fee" className="border p-3 rounded-lg" />

//         </div>

//         <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5">
//           {editingId ? "Update Doctor" : "Add Doctor"}
//         </button>

//       </form>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">

//         <table className="w-full">

//           <thead className="bg-gray-900 text-white">
//             <tr>
//               <th>ID</th>
//               <th>Specialization</th>
//               <th>Qualification</th>
//               <th>Experience</th>
//               <th>Fee</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredDoctors.map((d) => (
//               <tr key={d.id} className="text-center border-b">

//                 <td>{d.id}</td>
//                 <td>{d.specialization}</td>
//                 <td>{d.qualification}</td>
//                 <td>{d.experienceYears}</td>
//                 <td>{d.consultationFee}</td>

//                 <td className="flex gap-2 justify-center p-2">

//                   <button
//                     onClick={() => handleEdit(d)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(d.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default Doctors;