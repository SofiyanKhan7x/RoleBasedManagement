// // dashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const SuperAdminDashboard = () => {
//   const [admins, setAdmins] = useState([]);
//   const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
//   const [editingAdminId, setEditingAdminId] = useState(null);
//   const [editAdminData, setEditAdminData] = useState({
//     username: "",
//     password: "",
//     role: "ADMIN", // default role for editing
//   });

//   const fetchAdmins = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         "http://localhost:8080/api/auth/getAllAdmin",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAdmins(res.data);
//     } catch (error) {
//       console.error("Error fetching admins: ", error);
//     }
//   };

//   const handleAddAdmin = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         "http://localhost:8080/api/auth/addAdmin",
//         { ...newAdmin, role: "ADMIN", parent: { id: 1 } },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewAdmin({ username: "", password: "" });
//       fetchAdmins();
//     } catch (error) {
//       console.error("Error adding admin:", error);
//     }
//   };

//   const startEditing = (admin) => {
//     setEditingAdminId(admin.id);
//     setEditAdminData({
//       username: admin.username,
//       password: "", // leave blank, update only if typed
//       role: admin.role,
//     });
//   };

//   const cancelEditing = () => {
//     setEditingAdminId(null);
//     setEditAdminData({ username: "", password: "", role: "ADMIN" });
//   };

//   const handleUpdateAdmin = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       await axios.put(
//         `http://localhost:8080/api/auth/updateAdmin/${editingAdminId}`,
//         {
//           username: editAdminData.username,
//           password: editAdminData.password, // backend will encode it
//           role: editAdminData.role,
//           parent: { id: 1 },
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       cancelEditing();
//       fetchAdmins();
//     } catch (error) {
//       console.error("Error updating admin:", error);
//     }
//   };

//   const handleDeleteAdmin = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;

//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(`http://localhost:8080/api/auth/deleteAdmin/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchAdmins();
//     } catch (error) {
//       console.error("Error deleting admin:", error);
//     }
//   };

//   // New logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login"; // change this if your login page route differs
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Add Admin Form */}
//       <form onSubmit={handleAddAdmin} className="mb-6 space-y-4 max-w-sm">
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={newAdmin.username}
//           onChange={(e) =>
//             setNewAdmin({ ...newAdmin, username: e.target.value })
//           }
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={newAdmin.password}
//           onChange={(e) =>
//             setNewAdmin({ ...newAdmin, password: e.target.value })
//           }
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Add Admin
//         </button>
//       </form>

//       {/* Admin List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Admin List:</h2>
//         <ul className="space-y-4 max-w-md">
//           {admins.map((admin) => (
//             <li
//               key={admin.id}
//               className="p-4 border border-gray-300 rounded shadow-sm"
//             >
//               {editingAdminId === admin.id ? (
//                 // Edit Form Inline
//                 <form onSubmit={handleUpdateAdmin} className="space-y-2">
//                   <input
//                     type="text"
//                     className="w-full p-2 border border-gray-300 rounded"
//                     value={editAdminData.username}
//                     onChange={(e) =>
//                       setEditAdminData({
//                         ...editAdminData,
//                         username: e.target.value,
//                       })
//                     }
//                     required
//                   />
//                   <input
//                     type="password"
//                     placeholder="New Password (leave blank if no change)"
//                     className="w-full p-2 border border-gray-300 rounded"
//                     value={editAdminData.password}
//                     onChange={(e) =>
//                       setEditAdminData({
//                         ...editAdminData,
//                         password: e.target.value,
//                       })
//                     }
//                   />
//                   <select
//                     className="w-full p-2 border border-gray-300 rounded"
//                     value={editAdminData.role}
//                     onChange={(e) =>
//                       setEditAdminData({
//                         ...editAdminData,
//                         role: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="ADMIN">ADMIN</option>
//                     <option value="SUPERADMIN">SUPERADMIN</option>
//                   </select>
//                   <div className="flex space-x-2">
//                     <button
//                       type="submit"
//                       className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={cancelEditing}
//                       className="bg-gray-300 py-1 px-4 rounded hover:bg-gray-400"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 // Display admin info + edit & delete buttons
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p>
//                       <strong>ID:</strong> {admin.id}
//                     </p>
//                     <p>
//                       <strong>Username:</strong> {admin.username}
//                     </p>
//                     <p>
//                       <strong>Role:</strong> {admin.role}
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => startEditing(admin)}
//                       className="bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-500"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteAdmin(admin.id)}
//                       className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;



// dashboard.jsx
// dashboard.jsx
// dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiLogOut, FiUserPlus, FiSave, FiX, FiUsers } from "react-icons/fi";
import Swal from "sweetalert2";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editAdminData, setEditAdminData] = useState({
    username: "",
    password: "",
    role: "ADMIN",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch admins from API
  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8080/api/auth/getAllAdmin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAdmins(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching admins: ", error);
      showToast("error", "Failed to fetch admins");
      setIsLoading(false);
    }
  };

  // Show toast notification
  const showToast = (type, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    
    Toast.fire({
      icon: type,
      title: message
    });
  };

  // Handle add admin
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/auth/addAdmin",
        { ...newAdmin, role: "ADMIN", parent: { id: 1 } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAdmin({ username: "", password: "" });
      showToast("success", "Admin added successfully");
      setShowAddForm(false);
      fetchAdmins();
    } catch (error) {
      console.error("Error adding admin:", error);
      showToast("error", "Failed to add admin");
      setIsLoading(false);
    }
  };

  // Start editing an admin
  const startEditing = (admin) => {
    setEditingAdminId(admin.id);
    setEditAdminData({
      username: admin.username,
      password: "",
      role: admin.role,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingAdminId(null);
    setEditAdminData({ username: "", password: "", role: "ADMIN" });
  };

  // Handle update admin
  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      await axios.put(
        `http://localhost:8080/api/auth/updateAdmin/${editingAdminId}`,
        {
          username: editAdminData.username,
          password: editAdminData.password,
          role: editAdminData.role,
          parent: { id: 1 },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      cancelEditing();
      showToast("success", "Admin updated successfully");
      fetchAdmins();
    } catch (error) {
      console.error("Error updating admin:", error);
      showToast("error", "Failed to update admin");
      setIsLoading(false);
    }
  };

  // Handle delete admin
  const handleDeleteAdmin = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Admin?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      await axios.delete(`http://localhost:8080/api/auth/deleteAdmin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("success", "Admin deleted successfully");
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
      showToast("error", "Failed to delete admin");
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-gray-100 border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold">Admin Console</h1>
        </div>
        <nav className="p-4">
          <div className="flex items-center p-3 bg-gray-700 rounded-md">
            <FiUsers className="mr-3 text-gray-300" />
            <span className="text-gray-200">User Management</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center h-16 px-6">
            <h2 className="text-lg font-medium text-gray-800">Administrator Dashboard</h2>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
            >
              <FiLogOut className="mr-2" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Admin Accounts</h3>
              <p className="text-sm text-gray-500 mt-1">Manage system administrators</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              <FiUserPlus className="mr-2" />
              {showAddForm ? "Cancel" : "Add Admin"}
            </button>
          </div>

          {/* Add Admin Form */}
          {showAddForm && (
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-6">
              <h4 className="text-base font-medium mb-4 text-gray-800">Create New Administrator</h4>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-normal text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      placeholder="username"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      value={newAdmin.username}
                      onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-normal text-gray-600 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
                  >
                    {isLoading ? "Processing..." : "Create Administrator"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Admin List */}
          <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading && !admins.length ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-400"></div>
                        </div>
                      </td>
                    </tr>
                  ) : admins.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                        No administrator accounts found
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        {editingAdminId === admin.id ? (
                          <td colSpan="4" className="px-6 py-4">
                            <form onSubmit={handleUpdateAdmin} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                <div>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    value={editAdminData.username}
                                    onChange={(e) =>
                                      setEditAdminData({
                                        ...editAdminData,
                                        username: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div>
                                  <input
                                    type="password"
                                    placeholder="New password (optional)"
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    value={editAdminData.password}
                                    onChange={(e) =>
                                      setEditAdminData({
                                        ...editAdminData,
                                        password: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <select
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    value={editAdminData.role}
                                    onChange={(e) =>
                                      setEditAdminData({
                                        ...editAdminData,
                                        role: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="ADMIN">Admin</option>
                                    <option value="SUPERADMIN">Super Admin</option>
                                  </select>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    type="submit"
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
                                  >
                                    <FiSave className="mr-1" /> Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm flex items-center"
                                  >
                                    <FiX className="mr-1" /> Cancel
                                  </button>
                                </div>
                              </div>
                            </form>
                          </td>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-900">{admin.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`px-2 inline-flex text-xs leading-5 font-normal rounded ${
                                admin.role === "SUPERADMIN" 
                                  ? "bg-gray-200 text-gray-800" 
                                  : "bg-gray-100 text-gray-700"
                              }`}>
                                {admin.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEditing(admin)}
                                  className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100"
                                  title="Edit"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  onClick={() => handleDeleteAdmin(admin.id)}
                                  className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100"
                                  title="Delete"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;