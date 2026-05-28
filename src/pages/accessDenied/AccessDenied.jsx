import { useNavigate } from "react-router-dom";

import {
  FaLock,
  FaArrowLeft
} from "react-icons/fa";

const AccessDenied = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">

        {/* ICON */}

        <div className="flex justify-center mb-6">

          <div className="bg-red-100 p-6 rounded-full">

            <FaLock className="text-6xl text-red-500" />

          </div>

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-red-500 mb-4">
          403
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h2>

        {/* MESSAGE */}

        <p className="text-gray-500 mb-8 leading-relaxed">

          You do not have permission to access this page.

          Please contact administrator if you think this is a mistake.

        </p>

        {/* BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition w-full"
        >

          <FaArrowLeft />

          Go Back

        </button>

      </div>

    </div>
  );
};

export default AccessDenied;