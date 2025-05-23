// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:8080/api/auth/AllUsers",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   useEffect(() => {
//     fetchUsers();
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
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">Your Users</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {user.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {user.username}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {user.role}
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

// export default AdminDashboard;



import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "MANAGER",
  });
  const [activeTab, setActiveTab] = useState("all");

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/auth/AllUsers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        formData.role === "MANAGER"
          ? "addManager"
          : formData.role === "CASHIER"
          ? "addCashier"
          : "addStaff";

      await axios.post(`http://localhost:8080/api/auth/${endpoint}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchAllUsers();
      setFormData({ username: "", password: "", role: "MANAGER" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        editingUser.role === "MANAGER"
          ? "updateManager"
          : editingUser.role === "CASHIER"
          ? "updateCashier"
          : "updateStaff";

      await axios.put(
        `http://localhost:8080/api/auth/${endpoint}/${editingUser.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditingUser(null);
      fetchAllUsers();
      setFormData({ username: "", password: "", role: "MANAGER" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id, role) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        role === "MANAGER"
          ? "deleteManager"
          : role === "CASHIER"
          ? "deleteCashier"
          : "deleteStaff";

      await axios.delete(`http://localhost:8080/api/auth/${endpoint}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const filteredUsers =
    activeTab === "all"
      ? users
      : users.filter((user) => user.role === activeTab.toUpperCase());

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Create/Edit Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingUser ? `Edit ${editingUser.role}` : "Create New User"}
        </h2>
        <form onSubmit={editingUser ? handleUpdate : handleCreate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium">Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required={!editingUser}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Role</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              disabled={!!editingUser} // Disable role change when editing
            >
              <option value="MANAGER">Manager</option>
              <option value="CASHIER">Cashier</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            {editingUser && (
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ username: "", password: "", role: "MANAGER" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editingUser ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "all" ? "border-b-2 border-blue-500 font-medium" : ""
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Users
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "manager"
              ? "border-b-2 border-blue-500 font-medium"
              : ""
          }`}
          onClick={() => setActiveTab("manager")}
        >
          Managers
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "cashier"
              ? "border-b-2 border-blue-500 font-medium"
              : ""
          }`}
          onClick={() => setActiveTab("cashier")}
        >
          Cashiers
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "staff"
              ? "border-b-2 border-blue-500 font-medium"
              : ""
          }`}
          onClick={() => setActiveTab("staff")}
        >
          Staff
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "MANAGER"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "CASHIER"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.role)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;