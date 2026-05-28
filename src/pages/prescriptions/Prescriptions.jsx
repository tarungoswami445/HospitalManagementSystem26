import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllPrescriptions,
  savePrescription,
  deletePrescription,
  updatePrescription
} from "../../services/prescriptionService";

const Prescriptions = () => {

  const [prescriptions, setPrescriptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({

    doctorNotes: "",
    medicines: "",

    appointment: {
      id: ""
    }

  });

  // Load Prescriptions

  const loadPrescriptions = async () => {

    try {

      const response =
        await getAllPrescriptions();

      setPrescriptions(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    loadPrescriptions();

  }, []);
  const filteredPrescriptions = prescriptions.filter((p) => {

  const s = search.toLowerCase();

  return (
    p.id?.toString().includes(s) ||
    p.appointment?.id?.toString().includes(s) ||
    p.doctorNotes?.toLowerCase().includes(s) ||
    p.medicines?.toLowerCase().includes(s)
  );
});

  // Handle Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "appointmentId") {

      setFormData({
        ...formData,
        appointment: {
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

      await updatePrescription(
        editingId,
        formData
      );

      toast.success("Prescription Updated");

    } else {

      await savePrescription(formData);

      toast.success("Prescription Added");
    }

    loadPrescriptions();

    setEditingId(null);

    setFormData({

      doctorNotes: "",
      medicines: "",

      appointment: {
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

    await deletePrescription(id);

    toast.success("Prescription Deleted");

    loadPrescriptions();

  } catch (error) {

    toast.error("Delete Failed");
  }
};
const handleEdit = (prescription) => {

  setEditingId(prescription.id);

  setFormData({

    doctorNotes: prescription.doctorNotes,
    medicines: prescription.medicines,

    appointment: {
      id: prescription.appointment?.id || ""
    }

  });
};
  return (

    <div>

      <h1 className="text-4xl font-bold mb-6">
        Prescriptions
      </h1>
      <input
  type="text"
  placeholder="Search prescriptions..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-3 border rounded-lg mb-4"
/>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >

        <div className="grid grid-cols-1 gap-4">

          <input
            type="number"
            name="appointmentId"
            placeholder="Appointment ID"
            value={formData.appointment.id}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          name="doctorNotes"
          placeholder="Doctor Notes"
          value={formData.doctorNotes}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <textarea
          name="medicines"
          placeholder="Medicines"
          value={formData.medicines}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-5"
        >
        {editingId ? "Update Prescription" : "Add Prescription"}
        </button>

      </form>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>

              <th className="p-4">ID</th>
              <th className="p-4">Appointment</th>
              <th className="p-4">Doctor Notes</th>
              <th className="p-4">Medicines</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

           {filteredPrescriptions.map((prescription) => (

              <tr
                key={prescription.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {prescription.id}
                </td>

                <td className="p-4">
                  {prescription.appointment?.id}
                </td>

                <td className="p-4">
                  {prescription.doctorNotes}
                </td>

                <td className="p-4">
                  {prescription.medicines}
                </td>

                <td className="p-4 flex gap-2 justify-center">

  <button
    onClick={() => handleEdit(prescription)}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(prescription.id)
    }
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

export default Prescriptions;