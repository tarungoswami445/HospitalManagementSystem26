import {
  Link,
  useLocation
} from "react-router-dom";

import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaHospital,
  FaBed,
  FaTachometerAlt,
  FaFileMedical,
  FaNotesMedical,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  getRole,
  logout
} from "../../auth/authUtils";

const Sidebar = ({
  sidebarOpen
}) => {

  const role = getRole();

  const location = useLocation();

  const handleLogout = () => {

    logout();

    window.location.href = "/login";
  };

  // ACTIVE MENU

  const activeClass = (path) => {

    return location.pathname === path
      ? "bg-blue-500 shadow-lg"
      : "hover:bg-blue-500";
  };

  return (

    <div
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-2xl transition-all duration-300 z-50 overflow-y-auto ${
        sidebarOpen
          ? "w-64 p-6"
          : "w-20 p-4"
      }`}
    >

      {/* LOGO */}

      <h1 className="text-3xl font-bold mb-10 text-center text-blue-400">

        {sidebarOpen ? "HMS" : "H"}

      </h1>

      {/* MENU */}

      <ul className="space-y-4">

        {/* ================= DASHBOARD ================= */}

        <li>

          <Link
            to={`/${role.toLowerCase()}/dashboard`}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass(`/${role.toLowerCase()}/dashboard`)}`}
          >

            <FaTachometerAlt className="text-lg" />

            {sidebarOpen && "Dashboard"}

          </Link>

        </li>

        {/* ================= ADMIN ================= */}

        {role === "ADMIN" && (
          <>

            <li>

              <Link
                to="/admin/patients"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/patients")}`}
              >

                <FaUserInjured className="text-lg" />

                {sidebarOpen && "Patients"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/doctors"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/doctors")}`}
              >

                <FaUserMd className="text-lg" />

                {sidebarOpen && "Doctors"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/appointments"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/appointments")}`}
              >

                <FaCalendarCheck className="text-lg" />

                {sidebarOpen && "Appointments"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/admissions"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/admissions")}`}
              >

                <FaHospital className="text-lg" />

                {sidebarOpen && "Admissions"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/rooms"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/rooms")}`}
              >

                <FaBed className="text-lg" />

                {sidebarOpen && "Rooms"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/prescriptions"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/prescriptions")}`}
              >

                <FaNotesMedical className="text-lg" />

                {sidebarOpen && "Prescriptions"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/medical-records"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/medical-records")}`}
              >

                <FaFileMedical className="text-lg" />

                {sidebarOpen && "Medical Records"}

              </Link>

            </li>

            <li>

              <Link
                to="/admin/emergency-requests"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/admin/emergency-requests")}`}
              >

                <FaExclamationTriangle className="text-lg" />

                {sidebarOpen && "Emergency"}

              </Link>

            </li>

          </>
        )}

        {/* ================= DOCTOR ================= */}

        {role === "DOCTOR" && (
          <>

            <li>

              <Link
                to="/doctor/patients"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/doctor/patients")}`}
              >

                <FaUserInjured className="text-lg" />

                {sidebarOpen && "Patients"}

              </Link>

            </li>

            <li>

              <Link
                to="/doctor/appointments"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/doctor/appointments")}`}
              >

                <FaCalendarCheck className="text-lg" />

                {sidebarOpen && "Appointments"}

              </Link>

            </li>

            <li>

              <Link
                to="/doctor/prescriptions"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/doctor/prescriptions")}`}
              >

                <FaNotesMedical className="text-lg" />

                {sidebarOpen && "Prescriptions"}

              </Link>

            </li>

            <li>

              <Link
                to="/doctor/medical-records"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/doctor/medical-records")}`}
              >

                <FaFileMedical className="text-lg" />

                {sidebarOpen && "Medical Records"}

              </Link>

            </li>

          </>
        )}

        {/* ================= PATIENT ================= */}

        {role === "PATIENT" && (
          <>

            <li>

              <Link
                to="/patient/appointments"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/patient/appointments")}`}
              >

                <FaCalendarCheck className="text-lg" />

                {sidebarOpen && "Appointments"}

              </Link>

            </li>

            <li>

              <Link
                to="/patient/prescriptions"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/patient/prescriptions")}`}
              >

                <FaNotesMedical className="text-lg" />

                {sidebarOpen && "Prescriptions"}

              </Link>

            </li>

            <li>

              <Link
                to="/patient/medical-records"
                className={`flex items-center gap-3 p-3 rounded-lg transition ${activeClass("/patient/medical-records")}`}
              >

                <FaFileMedical className="text-lg" />

                {sidebarOpen && "Medical Records"}

              </Link>

            </li>

          </>
        )}

        {/* ================= LOGOUT ================= */}

        <li className="pt-6">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >

            <FaSignOutAlt className="text-lg" />

            {sidebarOpen && "Logout"}

          </button>

        </li>

      </ul>

    </div>
  );
};

export default Sidebar;