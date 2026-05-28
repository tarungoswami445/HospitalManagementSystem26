import { useEffect, useState } from "react";

import {
  getAllEmergencyRequests,
  saveEmergencyRequest,
  deleteEmergencyRequest
} from "../../services/emergencyService";

const EmergencyRequests = () => {

  const [requests, setRequests] = useState([]);

  const [formData, setFormData] = useState({

    emergencyLevel: "",
    message: "",
    status: "",

    patient: {
      id: ""
    }

  });

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

  }, []);

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

      await saveEmergencyRequest(formData);

      alert("Emergency Request Added");

      loadRequests();

      setFormData({

        emergencyLevel: "",
        message: "",
        status: "",

        patient: {
          id: ""
        }

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
          Send Emergency Request
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

            {requests.map((request) => (

              <tr
                key={request.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {request.id}
                </td>

                <td className="p-4">
                  {request.patient?.id}
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