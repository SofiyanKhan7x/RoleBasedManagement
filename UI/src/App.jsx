// // App.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login.jsx";
// import Dashboard from "./pages/SuperAdminDashboard.jsx";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/api/auth/login" />;
// };

// function App() {
//   return (
//     <Routes>
//       <Route path="/api/auth/login" element={<Login />} />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/api/auth/login" />} />
//     </Routes>
//   );
// }

// export default App;


// 2nd impo code
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import DashboardSelector from "./pages/DashboardSelector";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <DashboardSelector />
//           </PrivateRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

// export default App;



// src/App.js
// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardSelector from './pages/DashboardSelector';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardSelector />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App; // This is the crucial line