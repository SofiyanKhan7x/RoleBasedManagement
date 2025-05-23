// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SuperAdminDashboard from "./SuperAdminDashboard";
// import AdminDashboard from "./AdminDashboard";

// const DashboardSelector = () => {
//   const [dashboardType, setDashboardType] = useState(null);

//   useEffect(() => {
//     const determineDashboard = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         window.location.href = "/login";
//         return;
//       }

//       try {
//         // Check if user can access superadmin endpoint
//         await axios.get("http://localhost:8080/api/auth/getAllAdmin", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDashboardType("SUPERADMIN");
//       } catch {
//         try {
//           // Check if user can access admin endpoint
//           await axios.get("http://localhost:8080/api/auth/AllUsers", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setDashboardType("ADMIN");
//         } catch {
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }
//       }
//     };

//     determineDashboard();
//   }, []);

//   if (dashboardType === "SUPERADMIN") return <SuperAdminDashboard />;
//   if (dashboardType === "ADMIN") return <AdminDashboard />;
//   return (
//     <div className="flex justify-center items-center h-screen">Loading...</div>
//   );
// };

// export default DashboardSelector;


// src/components/DashboardSelector.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenRole } from '../utils/tokenUtils';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';

const DashboardSelector = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const extractedRole = getTokenRole(token);
    if (!['ADMIN', 'SUPERADMIN','MANAGER'].includes(extractedRole)) {
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    setRole(extractedRole);
  }, [navigate]);

  if (role === 'SUPERADMIN') return <SuperAdminDashboard />;
  if (role === 'ADMIN') return <AdminDashboard />;
  if (role === "MANAGER") return <ManagerDashboard />;
  
  return <div className="flex justify-center items-center h-screen">Loading...</div>;
};

export default DashboardSelector;