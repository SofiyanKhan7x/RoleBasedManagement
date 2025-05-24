// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ManagerDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     role: "CASHIER", // default to CASHIER
//   });
//   const [activeTab, setActiveTab] = useState("all");

//   const fetchAllUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:8080/api/auth/AllUsers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       // Filter out MANAGER role users
//       setUsers(response.data.filter((user) => user.role !== "MANAGER"));
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   const handleCreate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem("token");
// //       const endpoint = formData.role === "CASHIER" ? "addCashier" : "addStaff";

// //       await axios.post(`http://localhost:8080/api/auth/${endpoint}`, formData, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       fetchAllUsers();
// //       setFormData({ username: "", password: "", role: "CASHIER" });
// //     } catch (error) {
// //       console.error("Error creating user:", error);
// //     }
// //   };

// const handleCreate = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem("token");
//     const endpoint = formData.role === "CASHIER" ? "addCashier" : "addStaff";

//     const response = await axios.post(
//       `http://localhost:8080/api/auth/${endpoint}`,
//       {
//         username: formData.username,
//         password: formData.password,
//         role: formData.role,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     fetchAllUsers();
//     setFormData({ username: "", password: "", role: "CASHIER" });
//     alert("User created successfully!");
//   } catch (error) {
//     console.error("Error creating user:", error);
//     alert(
//       `Error creating user: ${error.response?.data?.message || error.message}`
//     );
//   }
// };



//   // const handleUpdate = async () => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const endpoint =
//   //       editingUser.role === "CASHIER" ? "updateCashier" : "updateStaff";

//   //     await axios.put(
//   //       `http://localhost:8080/api/auth/${endpoint}/${editingUser.id}`,
//   //       formData,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     setEditingUser(null);
//   //     fetchAllUsers();
//   //     setFormData({ username: "", password: "", role: "CASHIER" });
//   //   } catch (error) {
//   //     console.error("Error updating user:", error);
//   //   }
//   // };

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint =
//         editingUser.role === "CASHIER" ? "updateCashier" : "updateStaff";

//       const response = await axios.put(
//         `http://localhost:8080/api/auth/${endpoint}/${editingUser.id}`,
//         {
//           username: formData.username,
//           password: formData.password,
//           role: formData.role,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setEditingUser(null);
//       fetchAllUsers();
//       setFormData({ username: "", password: "", role: "CASHIER" });
//       alert("User updated successfully!");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert(
//         `Error updating user: ${error.response?.data?.message || error.message}`
//       );
//     }
//   };

//   const handleDelete = async (id, role) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       const endpoint = role === "CASHIER" ? "deleteCashier" : "deleteStaff";

//       await axios.delete(`http://localhost:8080/api/auth/${endpoint}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       fetchAllUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const startEdit = (user) => {
//     setEditingUser(user);
//     setFormData({
//       username: user.username,
//       password: "",
//       role: user.role,
//     });
//   };

//   const filteredUsers =
//     activeTab === "all"
//       ? users
//       : users.filter((user) => user.role === activeTab.toUpperCase());

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Manager Dashboard</h1>
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             window.location.href = "/login";
//           }}
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Create/Edit Form */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4">
//           {editingUser ? `Edit ${editingUser.role}` : "Create New User"}
//         </h2>
//         <form onSubmit={editingUser ? handleUpdate : handleCreate}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block mb-2 font-medium">Username</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded"
//                 value={formData.username}
//                 onChange={(e) =>
//                   setFormData({ ...formData, username: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">Password</label>
//               <input
//                 type="password"
//                 className="w-full p-2 border rounded"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required={!editingUser}
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-medium">Role</label>
//             <select
//               className="w-full p-2 border rounded"
//               value={formData.role}
//               onChange={(e) =>
//                 setFormData({ ...formData, role: e.target.value })
//               }
//               disabled={!!editingUser}
//             >
//               <option value="CASHIER">Cashier</option>
//               <option value="STAFF">Staff</option>
//             </select>
//           </div>

//           <div className="flex justify-end space-x-4">
//             {editingUser && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingUser(null);
//                   setFormData({ username: "", password: "", role: "CASHIER" });
//                 }}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             )}
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               {editingUser ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex border-b mb-4">
//         <button
//           className={`px-4 py-2 ${
//             activeTab === "all" ? "border-b-2 border-blue-500 font-medium" : ""
//           }`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Users
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeTab === "cashier"
//               ? "border-b-2 border-blue-500 font-medium"
//               : ""
//           }`}
//           onClick={() => setActiveTab("cashier")}
//         >
//           Cashiers
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             activeTab === "staff"
//               ? "border-b-2 border-blue-500 font-medium"
//               : ""
//           }`}
//           onClick={() => setActiveTab("staff")}
//         >
//           Staff
//         </button>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {user.username}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full ${
//                         user.role === "CASHIER"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-purple-100 text-purple-800"
//                       }`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap space-x-2">
//                     <button
//                       onClick={() => startEdit(user)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id, user.role)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiEdit2,
  FiTrash2,
  FiLogOut,
  FiUserPlus,
  FiSave,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";

const ManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "CASHIER",
  });
  const [activeTab, setActiveTab] = useState("all");

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/auth/AllUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.filter((user) => user.role !== "MANAGER"));
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const endpoint = formData.role === "CASHIER" ? "addCashier" : "addStaff";

      await axios.post(`http://localhost:8080/api/auth/${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire("Success", "User created successfully", "success");
      fetchAllUsers();
      setFormData({ username: "", password: "", role: "CASHIER" });
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to create user",
        "error"
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        formData.role === "CASHIER" ? "updateCashier" : "updateStaff";

      await axios.put(
        `http://localhost:8080/api/auth/${endpoint}/${editingUser.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire("Success", "User updated successfully", "success");
      setEditingUser(null);
      fetchAllUsers();
      setFormData({ username: "", password: "", role: "CASHIER" });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update user",
        "error"
      );
    }
  };

  const handleDelete = async (id, role) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const endpoint = role === "CASHIER" ? "deleteCashier" : "deleteStaff";

      await axios.delete(`http://localhost:8080/api/auth/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Success", "User deleted successfully", "success");
      fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: "",
      role: user.role,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({ username: "", password: "", role: "CASHIER" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const filteredUsers =
    activeTab === "all"
      ? users
      : users.filter((user) => user.role === activeTab.toUpperCase());

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-gray-100 border-r border-gray-700">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold">Manager Console</h1>
        </div>
        <nav className="p-4">
          <div className="flex items-center p-3 bg-gray-700 rounded-md">
            <FiUserPlus className="mr-3 text-gray-300" />
            <span className="text-gray-200">User Management</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center h-16 px-6">
            <h2 className="text-lg font-medium text-gray-800">
              User Management Dashboard
            </h2>
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
              <h3 className="text-xl font-semibold text-gray-800">
                User Accounts
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage Cashiers and Staff
              </p>
            </div>
            <button
              onClick={() => setEditingUser({})}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              <FiUserPlus className="mr-2" />
              Add User
            </button>
          </div>

          {/* Create/Edit Form */}
          {editingUser !== null && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                {editingUser?.id
                  ? `Edit ${editingUser.role}`
                  : "Create New User"}
              </h4>
              <form
                onSubmit={editingUser?.id ? handleUpdate : handleCreate}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder={
                        editingUser?.id ? "Leave blank to keep unchanged" : ""
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required={!editingUser?.id}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="CASHIER">Cashier</option>
                    <option value="STAFF">Staff</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md flex items-center"
                  >
                    <FiX className="mr-1" /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FiSave className="mr-1" />{" "}
                    {editingUser?.id ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "all"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Users
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "cashier"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("cashier")}
            >
              Cashiers
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "staff"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("staff")}
            >
              Staff
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blacl-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === "CASHIER"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(user)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                              title="Edit"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id, user.role)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
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

export default ManagerDashboard;