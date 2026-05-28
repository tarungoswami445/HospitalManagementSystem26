import { useEffect, useState } from "react";
import UpdateRoom from "./UpdateRoom";
import { getRooms, deleteRoom } from "../../services/roomService";
import { motion } from "framer-motion"; // ✅ ONLY ADD THIS

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("NONE");

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();

      const data =
        Array.isArray(res.data)
          ? res.data
          : res.data?.content
          ? res.data.content
          : res.data?.data
          ? res.data.data
          : [];

      setRooms(data);
    } catch (err) {
      setError("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
  try {
    await deleteRoom(id);
    setToast("Room deleted successfully");
    setTimeout(() => setToast(""), 2000);
    fetchRooms();
  } catch (err) {
    setToast("Delete failed");
  }
};

  let filteredRooms = rooms
    .filter((room) => filter === "ALL" || room.status === filter)
    .filter((room) =>
      room.roomNumber?.toString().includes(search) ||
      room.roomType?.toLowerCase().includes(search.toLowerCase())
    );

  if (sort === "PRICE_LOW") {
    filteredRooms.sort((a, b) => a.pricePerDay - b.pricePerDay);
  }
  if (sort === "PRICE_HIGH") {
    filteredRooms.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }
  if (sort === "FLOOR") {
    filteredRooms.sort((a, b) => a.floorNumber - b.floorNumber);
  }

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const paginatedRooms = filteredRooms.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  {toast && (
  <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow z-50">
    {toast}
  </div>
)}
  return (
    
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* DASHBOARD (NO CHANGE) */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <h2>Total Rooms</h2>
          <p className="text-2xl font-bold">{rooms.length}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h2>Available</h2>
          <p className="text-2xl font-bold text-green-600">
            {rooms.filter(r => r.status === "AVAILABLE").length}
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <h2>Occupied</h2>
          <p className="text-2xl font-bold text-red-600">
            {rooms.filter(r => r.status === "OCCUPIED").length}
          </p>
        </div>

      </div>

      {/* CONTROLS (NO CHANGE) */}
      <div className="flex gap-3 mb-4 flex-wrap">

        <input
          placeholder="Search room..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
          <option value="ALL">ALL</option>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OCCUPIED">OCCUPIED</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)} className="border p-2">
          <option value="NONE">Sort</option>
          <option value="PRICE_LOW">Price Low</option>
          <option value="PRICE_HIGH">Price High</option>
          <option value="FLOOR">Floor</option>
        </select>

      </div>

      {/* ROOM CARDS (ONLY ANIMATION ADDED) */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {paginatedRooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 rounded shadow"
            >

              <h2 className="font-bold">Room {room.roomNumber}</h2>
              <p>Type: {room.roomType}</p>
              <p>Floor: {room.floorNumber}</p>
              <p>₹{room.pricePerDay}</p>

              <p className={room.status === "AVAILABLE" ? "text-green-600" : "text-red-600"}>
                {room.status}
              </p>

              <div className="flex gap-2 mt-2">

                <button
                  onClick={() => setSelectedRoom(room.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(room.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                  
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      )}

      {/* PAGINATION (NO CHANGE) */}
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-black text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL (NO CHANGE) */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-[400px]">
            <UpdateRoom
              roomId={selectedRoom}
              onClose={() => setSelectedRoom(null)}
              refresh={fetchRooms}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default RoomList;