import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllDepartments,
  saveDepartment,
  updateDepartment,
  deleteDepartment
} from "../../services/departmentService";

const Department = () => {

  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  // LOAD DEPARTMENTS
  const loadDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT (ADD + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        await updateDepartment(editingId, formData);
        toast.success("Department Updated");
      } else {
        await saveDepartment(formData);
        toast.success("Department Added");
      }

      setEditingId(null);
      setFormData({ name: "", description: "" });
      loadDepartments();

    } catch (error) {
      console.log(error);
      toast.error("Error Occurred");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      toast.success("Deleted Successfully");
      loadDepartments();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // EDIT
  const handleEdit = (d) => {
    setEditingId(d.id);
    setFormData({
      name: d.name,
      description: d.description
    });
  };

  // FILTER
  const filteredDepartments = departments.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Department Management
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search department..."
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

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Department Name"
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 rounded-lg"
          />

        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5"
        >
          {editingId ? "Update Department" : "Add Department"}
        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredDepartments.map((d) => (
              <tr key={d.id} className="border-b text-center">

                <td className="p-4">{d.id}</td>
                <td className="p-4">{d.name}</td>
                <td className="p-4">{d.description}</td>

                <td className="p-4 flex gap-2 justify-center">

                  <button
                    onClick={() => handleEdit(d)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(d.id)}
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

export default Department;