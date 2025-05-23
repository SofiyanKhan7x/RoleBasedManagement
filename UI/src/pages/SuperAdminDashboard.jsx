// dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [editAdminData, setEditAdminData] = useState({
    username: "",
    password: "",
    role: "ADMIN", // default role for editing
  });

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8080/api/auth/getAllAdmin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAdmins(res.data);
    } catch (error) {
      console.error("Error fetching admins: ", error);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/api/auth/addAdmin",
        { ...newAdmin, role: "ADMIN", parent: { id: 1 } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAdmin({ username: "", password: "" });
      fetchAdmins();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const startEditing = (admin) => {
    setEditingAdminId(admin.id);
    setEditAdminData({
      username: admin.username,
      password: "", // leave blank, update only if typed
      role: admin.role,
    });
  };

  const cancelEditing = () => {
    setEditingAdminId(null);
    setEditAdminData({ username: "", password: "", role: "ADMIN" });
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8080/api/auth/updateAdmin/${editingAdminId}`,
        {
          username: editAdminData.username,
          password: editAdminData.password, // backend will encode it
          role: editAdminData.role,
          parent: { id: 1 },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      cancelEditing();
      fetchAdmins();
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/auth/deleteAdmin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // New logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // change this if your login page route differs
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Admin Form */}
      <form onSubmit={handleAddAdmin} className="mb-6 space-y-4 max-w-sm">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
          value={newAdmin.username}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={newAdmin.password}
          onChange={(e) =>
            setNewAdmin({ ...newAdmin, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Admin
        </button>
      </form>

      {/* Admin List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Admin List:</h2>
        <ul className="space-y-4 max-w-md">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="p-4 border border-gray-300 rounded shadow-sm"
            >
              {editingAdminId === admin.id ? (
                // Edit Form Inline
                <form onSubmit={handleUpdateAdmin} className="space-y-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editAdminData.username}
                    onChange={(e) =>
                      setEditAdminData({
                        ...editAdminData,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="New Password (leave blank if no change)"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editAdminData.password}
                    onChange={(e) =>
                      setEditAdminData({
                        ...editAdminData,
                        password: e.target.value,
                      })
                    }
                  />
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={editAdminData.role}
                    onChange={(e) =>
                      setEditAdminData({
                        ...editAdminData,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPERADMIN">SUPERADMIN</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="bg-gray-300 py-1 px-4 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // Display admin info + edit & delete buttons
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>ID:</strong> {admin.id}
                    </p>
                    <p>
                      <strong>Username:</strong> {admin.username}
                    </p>
                    <p>
                      <strong>Role:</strong> {admin.role}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(admin)}
                      className="bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;


