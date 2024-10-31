import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardPagination from "./CustomComponents/DashboardPagination";
import DashboardSearch from "./CustomComponents/DashboardSearch";
import { motion } from "framer-motion";

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const THEME_COLOR = "rgb(241, 97, 38)";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/reviews"
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch reviews.",
        icon: "error",
        confirmButtonColor: THEME_COLOR,
      });
    } finally {
      setLoading(false);
    }
  };

  const softDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/reviews/${reviewId}`);
      fetchReviews();
      Swal.fire({
        title: "Review deleted successfully",
        icon: "success",
        confirmButtonColor: THEME_COLOR,
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete review.",
        icon: "error",
        confirmButtonColor: THEME_COLOR,
      });
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

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
                  Reviews Management
                </h2>
                <p className="text-muted mb-0 mt-2">
                  Total Reviews: {reviews.length}
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

        {/* Reviews Table Section */}
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
                <p className="mt-3 text-muted">Loading reviews...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Rating</th>
                      <th className="px-4 py-3">Comment</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReviews.length > 0 ? (
                      currentReviews.map((review) => (
                        <motion.tr
                          key={review._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ backgroundColor: "#f8f9fa" }}
                        >
                          <td className="px-4 py-3">{review.user.name}</td>
                          <td className="px-4 py-3">{review.product.name}</td>
                          <td className="px-4 py-3">{review.rating}</td>
                          <td className="px-4 py-3">{review.comment}</td>
                          <td className="px-4 py-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="btn btn-sm btn-danger"
                              onClick={() => softDeleteReview(review._id)}
                            >
                              Delete
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <div className="d-flex flex-column align-items-center">
                            <p className="text-muted mb-0">No reviews found</p>
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
          {!loading && currentReviews.length > 0 && (
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

export default ReviewsManagement;
