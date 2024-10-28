import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardPagination from "./CustomComponents/DashboardPagination";
import DashboardSearch from "./CustomComponents/DashboardSearch";
import { motion } from "framer-motion";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const THEME_COLOR = "rgb(241, 97, 38)";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch users.",
        icon: "error",
        confirmButtonColor: THEME_COLOR,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    if (!userId) {
      Swal.fire({
        title: "Error",
        text: "User ID is undefined.",
        icon: "error",
        confirmButtonColor: THEME_COLOR,
      });
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/admin/users/${userId}/status`);
      fetchUsers();
      Swal.fire({
        title: `User ${
          currentStatus ? "deactivated" : "activated"
        } successfully`,
        icon: "success",
        confirmButtonColor: THEME_COLOR,
      });
    } catch (error) {
      console.error("Error toggling user status:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update user status.",
        icon: "error",
        confirmButtonColor: THEME_COLOR,
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card shadow-sm border-0 mb-4"
          style={{ borderRadius: "15px", overflow: "hidden" }}
        >
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="mb-0" style={{ color: THEME_COLOR }}>
                  User Management
                </h2>
                <p className="text-muted mb-0 mt-2">
                  Total Users: {users.length}
                </p>
              </div>
              <div className="col-md-6">
                <DashboardSearch
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Users Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card shadow-sm border-0"
          style={{ borderRadius: "15px", overflow: "hidden" }}
        >
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center p-5">
                <div
                  className="spinner-border"
                  style={{ color: THEME_COLOR }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading users...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <motion.tr
                          key={user._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ backgroundColor: "#f8f9fa" }}
                        >
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: `${THEME_COLOR}20`,
                                  color: THEME_COLOR,
                                }}
                              >
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`badge rounded-pill ${
                                user.isActive
                                  ? "bg-success-subtle text-success"
                                  : "bg-danger-subtle text-danger"
                              }`}
                              style={{
                                fontSize: "0.85em",
                                padding: "8px 12px",
                              }}
                            >
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-sm"
                              style={{
                                backgroundColor: user.isActive
                                  ? "#dc3545"
                                  : "#198754",
                                color: "white",
                                padding: "0.5rem 1rem",
                                borderRadius: "8px",
                              }}
                              onClick={() =>
                                toggleStatus(user._id, user.isActive)
                              }
                            >
                              {user.isActive ? "Deactivate" : "Activate"}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-5">
                          <div className="d-flex flex-column align-items-center">
                            <div
                              className="mb-3 p-3 rounded-circle"
                              style={{ backgroundColor: `${THEME_COLOR}20` }}
                            >
                              <i
                                className="bi bi-search"
                                style={{
                                  color: THEME_COLOR,
                                  fontSize: "1.5rem",
                                }}
                              ></i>
                            </div>
                            <p className="text-muted mb-0">No users found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination Section */}
          {!loading && currentUsers.length > 0 && (
            <div className="card-footer bg-white border-0 p-4">
              <DashboardPagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UsersManagement;
