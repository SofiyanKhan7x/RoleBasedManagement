

// import React, { useState } from "react";
// import axios from "../api/axiosConfig";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("api/auth/login", {
//         username,
//         password,
//       });

//       localStorage.setItem("token", res.data);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Login
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
//         )}

//         <div className="mb-4">
//           <label className="block mb-1 font-medium text-gray-700">
//             Username
//           </label>
//           <input
//             type="text"
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("api/auth/login", {
        username,
        password,
      });

      // Store the JWT token (which contains the role)
      localStorage.setItem("token", response.data);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;