import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHospital,
  FaUserShield,
  FaUserMd,
  FaUserInjured,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { loginUser } from "../../auth/authService";
import { setAuth } from "../../auth/authUtils";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ SELECTED ROLE
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  // =========================
  // AUTO LOGIN REDIRECT
  // =========================
  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    }

    else if (role === "DOCTOR") {
      navigate("/doctor/dashboard");
    }

    else if (role === "PATIENT") {
      navigate("/patient/dashboard");
    }

  }, []);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {

    e.preventDefault();

    // ✅ ROLE VALIDATION
    if (!selectedRole) {
      alert("Please select a role first");
      return;
    }

    try {

      const res = await loginUser({
        email,
        password,
        role: selectedRole,
      });

      const { token, role, fullName } = res.data;

      // ✅ ROLE CHECK
      if (role !== selectedRole) {
        alert(`You are not registered as ${selectedRole}`);
        return;
      }

      setAuth(token, role, fullName);

      // ROLE BASED REDIRECT
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      }

      else if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      }

      else if (role === "PATIENT") {
        navigate("/patient/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Invalid Email or Password");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 flex flex-col">

      {/* ================= HEADER ================= */}

      <header className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">

        {/* LOGO */}

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 text-white p-3 rounded-xl text-2xl shadow-lg">
            <FaHospital />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hospital Management System
            </h1>

            <p className="text-gray-500 text-sm">
              Smart Healthcare Administration Portal
            </p>
          </div>

        </div>

        {/* ROLE SELECT */}

        <div className="hidden md:flex items-center gap-4">

          {/* ADMIN */}

          <button
            onClick={() => setSelectedRole("ADMIN")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition duration-300 shadow-sm
            ${
              selectedRole === "ADMIN"
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            <FaUserShield />
            Admin
          </button>

          {/* DOCTOR */}

          <button
            onClick={() => setSelectedRole("DOCTOR")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition duration-300 shadow-sm
            ${
              selectedRole === "DOCTOR"
                ? "bg-green-600 text-white scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            <FaUserMd />
            Doctor
          </button>

          {/* PATIENT */}

          <button
            onClick={() => setSelectedRole("PATIENT")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition duration-300 shadow-sm
            ${
              selectedRole === "PATIENT"
                ? "bg-pink-600 text-white scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-pink-100"
            }`}
          >
            <FaUserInjured />
            Patient
          </button>

        </div>

      </header>

      {/* ================= LOGIN SECTION ================= */}

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

          {/* ================= LEFT SIDE ================= */}

          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-14 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full -mt-20 -mr-20"></div>

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -mb-20 -ml-20"></div>

            <div className="relative z-10">

              <h2 className="text-5xl font-bold leading-tight mb-6">
                Welcome Back 👋
              </h2>

              <p className="text-lg text-blue-100 leading-relaxed">
                Manage hospital operations efficiently with secure role-based access
                for Admins, Doctors, and Patients.
              </p>

              {/* ROLES INFO */}

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <FaUserShield className="text-3xl text-yellow-300" />

                  <div>
                    <h3 className="font-bold text-lg">Admin Access</h3>

                    <p className="text-sm text-blue-100">
                      Manage hospital staff & analytics
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <FaUserMd className="text-3xl text-green-300" />

                  <div>
                    <h3 className="font-bold text-lg">Doctor Portal</h3>

                    <p className="text-sm text-blue-100">
                      Handle appointments & prescriptions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <FaUserInjured className="text-3xl text-pink-300" />

                  <div>
                    <h3 className="font-bold text-lg">Patient Dashboard</h3>

                    <p className="text-sm text-blue-100">
                      Access reports & treatment details
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE LOGIN ================= */}

          <div className="flex items-center justify-center p-8 md:p-14">

            <form
              onSubmit={handleLogin}
              className="w-full max-w-md"
            >

              {/* TITLE */}

              <div className="mb-8 text-center">

                <h2 className="text-4xl font-bold text-gray-800">
                  Login Account
                </h2>

                <p className="text-gray-500 mt-2">
                  Access your hospital dashboard securely
                </p>

              </div>

              {/* SELECTED ROLE */}

              {selectedRole && (
                <div className="mb-6 bg-blue-100 text-blue-700 px-4 py-3 rounded-xl text-center font-semibold shadow-sm">
                  Selected Role : {selectedRole}
                </div>
              )}

              {/* EMAIL */}

              <div className="mb-5">

                <label className="block mb-2 font-medium text-gray-700">
                  Email Address
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

                  <FaEnvelope className="text-gray-400 mr-3" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full outline-none bg-transparent"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div className="mb-6">

                <label className="block mb-2 font-medium text-gray-700">
                  Password
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

                  <FaLock className="text-gray-400 mr-3" />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full outline-none bg-transparent"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>

              </div>

              {/* BUTTON */}

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition duration-300"
              >
                Login Now
              </button>
              <p className="text-center text-gray-500 mt-6 text-sm">
  Don't have an account?

<span
  onClick={() => {

    if (selectedRole === "PATIENT") {

      navigate("/register");
    }

    else if (selectedRole === "DOCTOR") {

      alert("Doctor registration only by Admin");
    }

    else if (selectedRole === "ADMIN") {

      alert("Admin registration not allowed");
    }

    else {

      alert("Please select a role first");
    }
  }}
  className="text-blue-600 font-semibold ml-2 cursor-pointer"
>
  Register Here
</span>
</p>

              {/* FOOTER */}

              <p className="text-center text-gray-500 mt-6 text-sm">
                Secure Login • Hospital Management System
              </p>

            </form>

          </div>

        </div>

      </div>

    </div>

    
  );
};

export default Login;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaHospital,
//   FaUserShield,
//   FaUserMd,
//   FaUserInjured,
//   FaEnvelope,
//   FaLock,
// } from "react-icons/fa";

// import { loginUser } from "../../auth/authService";
// import { setAuth } from "../../auth/authUtils";

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   // =========================
//   // AUTO LOGIN REDIRECT
//   // =========================
//   useEffect(() => {

//     const role = localStorage.getItem("role");

//     if (role === "ADMIN") {
//       navigate("/admin/dashboard");
//     }

//     else if (role === "DOCTOR") {
//       navigate("/doctor/dashboard");
//     }

//     else if (role === "PATIENT") {
//       navigate("/patient/dashboard");
//     }

//   }, []);

//   // =========================
//   // LOGIN
//   // =========================
//   const handleLogin = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await loginUser({
//         email,
//         password,
//       });

//       const { token, role, fullName } = res.data;

//       setAuth(token, role, fullName);

//       // ROLE BASED REDIRECT
//       if (role === "ADMIN") {
//         navigate("/admin/dashboard");
//       }

//       else if (role === "DOCTOR") {
//         navigate("/doctor/dashboard");
//       }

//       else if (role === "PATIENT") {
//         navigate("/patient/dashboard");
//       }

//     } catch (error) {

//       console.log(error);

//       alert("Invalid Email or Password");
//     }
//   };

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 flex flex-col">

//       {/* ================= HEADER ================= */}

//       <header className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">

//         <div className="flex items-center gap-3">

//           <div className="bg-blue-600 text-white p-3 rounded-xl text-2xl shadow-lg">
//             <FaHospital />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Hospital Management System
//             </h1>

//             <p className="text-gray-500 text-sm">
//               Smart Healthcare Administration Portal
//             </p>
//           </div>

//         </div>

//         <div className="hidden md:flex items-center gap-6">

//           <div className="flex items-center gap-2 text-gray-600 font-medium">
//             <FaUserShield className="text-blue-600" />
//             Admin
//           </div>

//           <div className="flex items-center gap-2 text-gray-600 font-medium">
//             <FaUserMd className="text-green-600" />
//             Doctor
//           </div>

//           <div className="flex items-center gap-2 text-gray-600 font-medium">
//             <FaUserInjured className="text-red-500" />
//             Patient
//           </div>

//         </div>

//       </header>

//       {/* ================= LOGIN SECTION ================= */}

//       <div className="flex flex-1 items-center justify-center p-6">

//         <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">

//           {/* LEFT SIDE */}

//           <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-14 relative overflow-hidden">

//             <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full -mt-20 -mr-20"></div>

//             <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -mb-20 -ml-20"></div>

//             <div className="relative z-10">

//               <h2 className="text-5xl font-bold leading-tight mb-6">
//                 Welcome Back 👋
//               </h2>

//               <p className="text-lg text-blue-100 leading-relaxed">
//                 Manage hospital operations efficiently with secure role-based access
//                 for Admins, Doctors, and Patients.
//               </p>

//               {/* ROLES */}

//               <div className="mt-10 space-y-5">

//                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
//                   <FaUserShield className="text-3xl text-yellow-300" />
//                   <div>
//                     <h3 className="font-bold text-lg">Admin Access</h3>
//                     <p className="text-sm text-blue-100">
//                       Manage hospital, staff & analytics
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
//                   <FaUserMd className="text-3xl text-green-300" />
//                   <div>
//                     <h3 className="font-bold text-lg">Doctor Portal</h3>
//                     <p className="text-sm text-blue-100">
//                       Handle appointments & prescriptions
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
//                   <FaUserInjured className="text-3xl text-pink-300" />
//                   <div>
//                     <h3 className="font-bold text-lg">Patient Dashboard</h3>
//                     <p className="text-sm text-blue-100">
//                       Access reports & treatment details
//                     </p>
//                   </div>
//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* RIGHT SIDE LOGIN */}

//           <div className="flex items-center justify-center p-8 md:p-14">

//             <form
//               onSubmit={handleLogin}
//               className="w-full max-w-md"
//             >

//               <div className="mb-8 text-center">

//                 <h2 className="text-4xl font-bold text-gray-800">
//                   Login Account
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                   Access your hospital dashboard securely
//                 </p>

//               </div>

//               {/* EMAIL */}

//               <div className="mb-5">

//                 <label className="block mb-2 font-medium text-gray-700">
//                   Email Address
//                 </label>

//                 <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

//                   <FaEnvelope className="text-gray-400 mr-3" />

//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full outline-none bg-transparent"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />

//                 </div>

//               </div>

//               {/* PASSWORD */}

//               <div className="mb-6">

//                 <label className="block mb-2 font-medium text-gray-700">
//                   Password
//                 </label>

//                 <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

//                   <FaLock className="text-gray-400 mr-3" />

//                   <input
//                     type="password"
//                     placeholder="Enter your password"
//                     className="w-full outline-none bg-transparent"
//                     onChange={(e) => setPassword(e.target.value)}
//                   />

//                 </div>

//               </div>

//               {/* BUTTON */}

//               <button
//                 className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition duration-300"
//               >
//                 Login Now
//               </button>

//               {/* FOOTER */}

//               <p className="text-center text-gray-500 mt-6 text-sm">
//                 Secure Login • Hospital Management System
//               </p>

//             </form>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Login;



























































































// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { loginUser } from "../../auth/authService";
// import { setAuth } from "../../auth/authUtils";

// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   useEffect(() => {

//   const role = localStorage.getItem("role");

//   if (role === "ADMIN") {
//     navigate("/admin/dashboard");
//   }

//   else if (role === "DOCTOR") {
//     navigate("/doctor/dashboard");
//   }

//   else if (role === "PATIENT") {
//     navigate("/patient/dashboard");
//   }

// }, []);

//   const handleLogin = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await loginUser({
//         email,
//         password,
//       });

//      const { token, role, fullName } = res.data;

// setAuth(token, role, fullName);

//       // ROLE BASED REDIRECT

//       if (role === "ADMIN") {
//         navigate("/admin/dashboard");
//       }

//       else if (role === "DOCTOR") {
//         navigate("/doctor/dashboard");
//       }

//       else if (role === "PATIENT") {
//         navigate("/patient/dashboard");
//       }

//     } catch (error) {

//       console.log(error);

//       alert("Invalid Email or Password");
//     }
//   };

//   return (

//     <div className="flex items-center justify-center min-h-screen bg-gray-100">

//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
//       >

//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
//           HMS Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Enter Email"
//           className="w-full p-3 border rounded-lg mb-4"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           className="w-full p-3 border rounded-lg mb-6"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//       </form>

//     </div>
//   );
// };

// export default Login;