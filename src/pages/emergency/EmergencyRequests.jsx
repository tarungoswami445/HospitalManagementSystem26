import { useEffect, useState } from "react";

import {
  getAllEmergencyRequests,
  saveEmergencyRequest,
  deleteEmergencyRequest,
  updateEmergencyRequest,
  getAllPatients
} from "../../services/emergencyService";

const EmergencyRequests = () => {

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
  patientId: "",
  emergencyLevel: "",
  message: "",
  status: ""
});
const loadPatients = async () => {
  try {
    const response = await getAllPatients();
    setPatients(response.data);
  } catch (error) {
    console.log(error);
  }
};

  // Load Requests

  const loadRequests = async () => {

    try {

      const response =
        await getAllEmergencyRequests();

      setRequests(response.data);

    } catch (error) {

      console.log(error);
    }
  };

 useEffect(() => {

  loadRequests();
  loadPatients();

}, []);

  const filteredRequests = requests.filter((r) => {

  const s = search.toLowerCase();

  return (
    r.patientName?.toLowerCase().includes(s) ||
    r.emergencyLevel?.toLowerCase().includes(s) ||
    r.status?.toLowerCase().includes(s) ||
    r.message?.toLowerCase().includes(s)
  );
});
const handleEdit = (request) => {

  setEditingId(request.id);

  setFormData({
    patientId: request.patientId,
    emergencyLevel: request.emergencyLevel,
    message: request.message,
    status: request.status
  });
};


  // Handle Change

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};
// Save

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editingId) {

      await updateEmergencyRequest(
        editingId,
        formData
      );

      alert("Emergency Request Updated");

    } else {

      await saveEmergencyRequest(formData);

      alert("Emergency Request Added");
    }

    loadRequests();

    setEditingId(null);

    setFormData({
      patientId: "",
      emergencyLevel: "",
      message: "",
      status: ""
    });

  } catch (error) {

    console.log(error);
  }
};
  // Delete

  const handleDelete = async (id) => {

    try {

      await deleteEmergencyRequest(id);

      alert("Emergency Request Deleted");

      loadRequests();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div>

      <h1 className="text-4xl font-bold mb-6">
        Emergency Requests
      </h1>
      <input
  type="text"
  placeholder="Search emergency requests..."
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
  required
>
  <option value="">
    Select Patient
  </option>

  {patients.map((patient) => (
    <option
      key={patient.id}
      value={patient.id}
    >
      {patient.userName} (Patient ID: {patient.id})
    </option>
  ))}
</select>

          <input
            type="text"
            name="emergencyLevel"
            placeholder="Emergency Level"
            value={formData.emergencyLevel}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          name="message"
          placeholder="Emergency Message"
          value={formData.message}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

       <button
  type="submit"
  className="bg-red-500 text-white px-6 py-3 rounded-lg mt-5"
>
  {editingId
    ? "Update Emergency Request"
    : "Send Emergency Request"}
</button>

      </form>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>

              <th className="p-4">ID</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Level</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

           {filteredRequests.map((request) => (

              <tr
                key={request.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {request.id}
                </td>

               <td className="p-4">
                {request.patientName}
                    </td>

                <td className="p-4">
                  {request.emergencyLevel}
                </td>

                <td className="p-4">
                  {request.message}
                </td>

                <td className="p-4">
                  {request.status}
                </td>

<td className="p-4">

  <button
    onClick={() => handleEdit(request)}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(request.id)
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

export default EmergencyRequests;