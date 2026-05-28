import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllPatients,
  savePatient,
  deletePatient,
  updatePatient,
} from "../../services/patientService";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    disease: "",
    user: { id: "" },
  });

  // LOAD
  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await getAllPatients();
      setPatients(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // SEARCH + FILTER
  const filteredPatients = patients
    .filter((p) =>
      p.disease?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      filterGender === "ALL" ? true : p.gender === filterGender
    );

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userId") {
      setFormData({
        ...formData,
        user: { id: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updatePatient(editingId, formData);
        toast.success("Patient Updated");
      } else {
        await savePatient(formData);
        toast.success("Patient Added");
      }

      setEditingId(null);
      loadPatients();

      setFormData({
        age: "",
        gender: "",
        bloodGroup: "",
        address: "",
        disease: "",
        user: { id: "" },
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      toast.success("Patient Deleted");
      loadPatients();
    } catch {
      toast.error("Delete Failed");
    }
  };

  // EDIT
  const handleEdit = (p) => {
    setEditingId(p.id);

    setFormData({
      age: p.age,
      gender: p.gender,
      bloodGroup: p.bloodGroup,
      address: p.address,
      disease: p.disease,
      user: { id: p.user?.id || "" },
    });
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 p-6">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="h-20 bg-gray-300 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-4 flex-wrap">

        <input
          placeholder="Search disease..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setFilterGender(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

      </div>

      {/* FORM (UNCHANGED UI) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >

        <div className="grid grid-cols-2 gap-4">

          <input name="userId" value={formData.user.id} onChange={handleChange} placeholder="User ID" className="border p-3 rounded-lg" />
          <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="border p-3 rounded-lg" />
          <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="border p-3 rounded-lg" />
          <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" className="border p-3 rounded-lg" />
          <input name="disease" value={formData.disease} onChange={handleChange} placeholder="Disease" className="border p-3 rounded-lg" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-3 rounded-lg" />

        </div>

        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5">
          {editingId ? "Update Patient" : "Add Patient"}
        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood</th>
              <th>Disease</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredPatients.map((p) => (
              <tr key={p.id} className="text-center border-b">

                <td>{p.id}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.bloodGroup}</td>
                <td>{p.disease}</td>

                <td className="flex gap-2 justify-center p-2">

                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
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

export default Patients;