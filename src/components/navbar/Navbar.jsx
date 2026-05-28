import { useNavigate } from "react-router-dom";

import {
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  logout,
  getRole,
  getFullName,
} from "../../auth/authUtils";

const Navbar = ({
  sidebarOpen,
  setSidebarOpen
}) => {

  const navigate = useNavigate();

  const role = getRole();

  const fullName = getFullName();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (

    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center border-b">

      {/* LEFT */}

      <div className="flex items-center gap-5">

        {/* TOGGLE BUTTON */}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-gray-700 hover:text-blue-500 transition"
        >

          <FaBars />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Hospital Management System
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back 👋
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* USER */}

        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">

          <FaUserCircle className="text-4xl text-blue-500" />

          <div>

            <h2 className="font-semibold text-gray-800">
              {fullName || "User"}
            </h2>

            <p className="text-sm text-gray-500">
              {role}
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition shadow-md"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>
  );
};

export default Navbar;