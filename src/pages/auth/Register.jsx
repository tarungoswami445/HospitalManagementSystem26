import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FaHospital,
  FaUserInjured,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser
} from "react-icons/fa";

import { registerPatient } from "../../auth/authService";
import { setAuth } from "../../auth/authUtils";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await registerPatient(formData);

      const { token, role, fullName } = res.data;

      setAuth(token, role, fullName);

      navigate("/patient/dashboard");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-14 relative">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mt-20 -mr-20"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-8">

              <div className="bg-white text-cyan-700 p-4 rounded-2xl text-3xl">
                <FaHospital />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  HMS Portal
                </h1>

                <p className="text-cyan-100">
                  Patient Registration
                </p>
              </div>

            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Create Your Patient Account
            </h2>

            <p className="text-lg text-cyan-100">
              Register securely to access appointments,
              prescriptions and medical records.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-10 md:p-14 flex items-center">

          <form
            onSubmit={handleRegister}
            className="w-full"
          >

            <div className="mb-8 text-center">

              <h2 className="text-4xl font-bold text-gray-800">
                Patient Registration
              </h2>

              <p className="text-gray-500 mt-2">
                Create your account securely
              </p>

            </div>

            {/* FULL NAME */}

            <div className="mb-5">

              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaUser className="text-gray-400 mr-3" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  className="w-full outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="mb-5">

              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaEnvelope className="text-gray-400 mr-3" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="mb-5">

              <label className="block mb-2 font-medium text-gray-700">
                Phone
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaPhone className="text-gray-400 mr-3" />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone"
                  className="w-full outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="mb-6">

              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 py-3">

                <FaLock className="text-gray-400 mr-3" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition duration-300"
            >
              Register Now
            </button>

            {/* LOGIN */}

            <p className="text-center mt-6 text-gray-600">

              Already have an account?

              <Link
                to="/login"
                className="text-blue-600 font-semibold ml-2"
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;