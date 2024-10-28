import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Review = ({
  productId,
  productName,
  initialRating,
  initialRatingsCount,
}) => {
  const [feedback, setFeedback] = useState([]);
  const [averageRating, setAverageRating] = useState(initialRating || 0);
  const [totalRatings, setTotalRatings] = useState(initialRatingsCount || 0);
  const [newFeedback, setNewFeedback] = useState({
    productId: productId,
    rating: 5,
    comment: "",
  });

  console.log("yuta", productId);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedbackData();
    setNewFeedback((prev) => ({ ...prev, productId }));
  }, [productId]);

  const fetchFeedbackData = async () => {
    try {
      const [feedbackRes, averageRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/feedback/product/${productId}`),
        axios.get(
          `http://localhost:3000/api/feedback/product/${productId}/average`
        ),
      ]);

      setFeedback(feedbackRes.data);
      setAverageRating(averageRes.data.averageRating);
      setTotalRatings(averageRes.data.totalRatings);
    } catch (err) {
      setError("Failed to load feedback data");
      console.error("Error fetching feedback:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const feedbackData = {
        productId: productId,
        rating: newFeedback.rating,
        comment: newFeedback.comment,
      };

      const res = await axios.post(
        `http://localhost:3000/api/feedback/product/${productId}`,
        feedbackData,
        { withCredentials: true }
      );

      setFeedback([res.data, ...feedback]);
      setNewFeedback({
        productId: productId,
        rating: 5,
        comment: "",
      });
      setSuccess("Feedback submitted successfully!");
      fetchFeedbackData();
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar
              key={`full-${index}`}
              className="text-theme"
              style={{
                cursor: interactive ? "pointer" : "default",
                fontSize: "1.5rem",
              }}
              onClick={
                interactive
                  ? () => setNewFeedback({ ...newFeedback, rating: index + 1 })
                  : undefined
              }
            />
          ))}
        {halfStar && (
          <FaStarHalfAlt
            className="text-theme"
            style={{
              cursor: interactive ? "pointer" : "default",
              fontSize: "1.5rem",
            }}
            onClick={
              interactive
                ? () =>
                    setNewFeedback({ ...newFeedback, rating: fullStars + 0.5 })
                : undefined
            }
          />
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar
              key={`empty-${index}`}
              className="text-theme"
              style={{
                cursor: interactive ? "pointer" : "default",
                fontSize: "1.5rem",
              }}
              onClick={
                interactive
                  ? () =>
                      setNewFeedback({ ...newFeedback, rating: fullStars + 1 })
                  : undefined
              }
            />
          ))}
      </>
    );
  };

  return (
    <div className="container my-5">
      <style>
        {`
          .lab-btn {
            background-color: rgb(241, 97, 38);
            color: white;
            border: none;
          }
          .lab-btn:hover {
            background-color: rgb(220, 85, 30);
          }
          .text-theme {
            color: rgb(241, 97, 38) !important;
          }
        `}
      </style>
      {/* Average Rating Display */}
      <div className="card shadow mb-4 border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-secondary">
            Overall Rating for {productName}
          </h5>
          <div className="display-4 mb-2 text-theme">
            {averageRating.toFixed(1)}
          </div>
          <div className="mb-2">{renderStars(Math.round(averageRating))}</div>
          <p className="text-muted">
            Based on {totalRatings} {totalRatings === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>
      {/* Feedback Form */}
      <div className="card shadow mb-4 border-0">
        <div className="card-body">
          <h5 className="card-title text-secondary">Write a Review</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div className="mb-2">
                {renderStars(newFeedback.rating, true)}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Comment</label>
              <textarea
                className="form-control"
                rows="3"
                value={newFeedback.comment}
                onChange={(e) =>
                  setNewFeedback({
                    ...newFeedback,
                    comment: e.target.value,
                  })
                }
                required
                placeholder="Share your experience..."
              />
            </div>

            <button type="submit" className="lab-btn w-100" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
      {/* Feedback List */}
      <div className="card shadow border-0">
        <div className="card-body">
          <h5 className="card-title text-secondary">Reviews</h5>
          {feedback.length === 0 ? (
            <p className="text-muted">No reviews yet</p>
          ) : (
            feedback.map(
              (item) => (
                console.log("pleeeees", feedback),
                (
                  <div key={item._id} className="border-bottom mb-3 pb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>{item.user.name}</strong>
                        <br />
                        <small className="text-muted">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <div>{renderStars(item.rating)}</div>
                    </div>
                    <p className="mb-0">{item.comment}</p>
                  </div>
                )
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
