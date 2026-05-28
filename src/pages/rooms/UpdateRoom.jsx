import { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../../services/roomService";

const UpdateRoom = ({ roomId, onClose, refresh }) => {
  const [form, setForm] = useState({
    roomNumber: "",
    roomType: "",
    floorNumber: "",
    pricePerDay: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {
    const res = await getRoomById(roomId);
    setForm(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateRoom(roomId, form);
    alert("Room updated successfully");
    refresh();
    onClose();
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Update Room</h2>

      <form onSubmit={handleUpdate} className="grid gap-3">

        <input
          name="roomNumber"
          value={form.roomNumber}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="roomType"
          value={form.roomType}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="floorNumber"
          type="number"
          value={form.floorNumber}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="pricePerDay"
          type="number"
          value={form.pricePerDay}
          onChange={handleChange}
          className="border p-2"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OCCUPIED">OCCUPIED</option>
        </select>

        <button className="bg-green-600 text-white p-2">
          Update Room
        </button>

      </form>
    </div>
  );
};

export default UpdateRoom;