import { useState } from "react";
import api from "../../services/api";

const AddRoom = () => {
  const [form, setForm] = useState({
    roomNumber: "",
    roomType: "",
    floorNumber: "",
    pricePerDay: "",
    status: "AVAILABLE",
  });

  const [loading, setLoading] = useState(false);

  // =============================
  // HANDLE INPUT
  // =============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // SUBMIT ROOM
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/api/rooms", form);

      alert("Room added successfully");

      setForm({
        roomNumber: "",
        roomType: "",
        floorNumber: "",
        pricePerDay: "",
        status: "AVAILABLE",
      });

    } catch (err) {
      alert("Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10">

      <h1 className="text-2xl font-bold mb-4">
        Add Room
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">

        <input
          name="roomNumber"
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="roomType"
          placeholder="Room Type (ICU/General/Private)"
          value={form.roomType}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="floorNumber"
          placeholder="Floor Number"
          type="number"
          value={form.floorNumber}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          name="pricePerDay"
          placeholder="Price per day"
          type="number"
          value={form.pricePerDay}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OCCUPIED">OCCUPIED</option>
        </select>

        <button
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Saving..." : "Add Room"}
        </button>

      </form>
    </div>
  );
};

export default AddRoom;