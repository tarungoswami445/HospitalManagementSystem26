import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllMedicalRecords,
  saveMedicalRecord,
  deleteMedicalRecord,
  updateMedicalRecord
} from "../../services/medicalRecordService";

const MedicalRecords = () => {

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({

    diagnosis: "",
    treatment: "",
    allergies: "",

    patient: {
      id: ""
    }

  });

  // Load Records

  const loadRecords = async () => {

    try {

      const response =
        await getAllMedicalRecords();

      setRecords(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    loadRecords();

  }, []);

  const filteredRecords = records.filter((record) => {

  const s = search.toLowerCase();

  return (
    record.id?.toString().includes(s) ||
    record.patient?.id?.toString().includes(s) ||
    record.diagnosis?.toLowerCase().includes(s) ||
    record.treatment?.toLowerCase().includes(s)
  );
});
  // Handle Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "patientId") {

      setFormData({
        ...formData,
        patient: {
          id: value
        }
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Save

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editingId) {

      await updateMedicalRecord(
        editingId,
        formData
      );

      toast.success("Medical Record Updated");

    } else {

      await saveMedicalRecord(formData);

      toast.success("Medical Record Added");
    }

    loadRecords();

    setEditingId(null);

    setFormData({

      diagnosis: "",
      treatment: "",
      allergies: "",

      patient: {
        id: ""
      }

    });

  } catch (error) {

    console.log(error);

    toast.error("Something went wrong");
  }
};
  // Delete

const handleDelete = async (id) => {

  try {

    await deleteMedicalRecord(id);

    toast.success("Record Deleted");

    loadRecords();

  } catch (error) {

    toast.error("Delete Failed");
  }
};
const handleEdit = (record) => {

  setEditingId(record.id);

  setFormData({

    diagnosis: record.diagnosis,
    treatment: record.treatment,
    allergies: record.allergies,

    patient: {
      id: record.patient?.id || ""
    }

  });
};
  return (

    <div>

      <h1 className="text-4xl font-bold mb-6">
        Medical Records
      </h1>
      <input
  type="text"
  placeholder="Search medical records..."
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
            type="number"
            name="patientId"
            placeholder="Patient ID"
            value={formData.patient.id}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="diagnosis"
            placeholder="Diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          name="treatment"
          placeholder="Treatment"
          value={formData.treatment}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <textarea
          name="allergies"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5"
        >
         {editingId ? "Update Record" : "Add Record"}
        </button>

      </form>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>

              <th className="p-4">ID</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Diagnosis</th>
              <th className="p-4">Treatment</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredRecords.map((record) => (

              <tr
                key={record.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {record.id}
                </td>

                <td className="p-4">
                  {record.patient?.id}
                </td>

                <td className="p-4">
                  {record.diagnosis}
                </td>

                <td className="p-4">
                  {record.treatment}
                </td>

                <td className="p-4 flex gap-2 justify-center">

  <button
    onClick={() => handleEdit(record)}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(record.id)}
    className="bg-red-500 text-white px-4 py-2 rounded-lg"
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

export default MedicalRecords;