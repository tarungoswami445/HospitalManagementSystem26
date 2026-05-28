// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../auth/authService";
// import { setAuth } from "../../auth/authUtils";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await loginUser({ email, password });

//       const { token, role } = res.data;

//       setAuth(token, role);

//       if (role === "ADMIN") navigate("/admin");
//       else if (role === "DOCTOR") navigate("/doctor");
//       else navigate("/patient");

//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="p-4">
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button>Login</button>
//     </form>
//   );
// };

// export default LoginPage;