import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardPagination from "./CustomComponents/DashboardPagination";

const OrderCard = ({ order, onStatusChange }) => (
  <div className="card mb-4 shadow-sm border-0">
    <div className="card-body">
      <p className="card-text text-muted">
        <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
      </p>
      <h6 className="text-secondary">Products:</h6>
      <ul className="list-group list-group-flush">
        {order.products.map((productDetail) => (
          <li
            key={productDetail.product._id}
            className="list-group-item border-0"
          >
            {productDetail.product.name}{" "}
            <span className="text-muted">(x{productDetail.quantity})</span> -
            <span className="fw-bold">
              {" "}
              ${productDetail.product.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex align-items-center">
        {order.paymentStatus === "Pending" && (
          <button
            className="btn btn-primary me-3"
            style={{
              backgroundColor: "rgb(241, 97, 38)",
              borderColor: "rgb(241, 97, 38)",
            }}
            onClick={() => onStatusChange(order._id)}
          >
            Mark as Completed
          </button>
        )}
        <span
          className={`badge ${
            order.paymentStatus === "Completed" ? "bg-success" : "bg-warning"
          } text-white`}
          style={{
            fontSize: "0.9rem",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
          }}
        >
          {order.paymentStatus}
        </span>
      </div>
    </div>
  </div>
);

export default function OrdersSection() {
  const [activeTab, setActiveTab] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/orders/${
          activeTab === "pending" ? "pending" : "completed"
        }`
      );
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this order as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(241, 97, 38)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:3000/api/admin/orders/${orderId}`);
        await fetchOrders();
        Swal.fire(
          "Marked!",
          "The order has been marked as completed.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error!", "Failed to update order status.", "error");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="container">
      <h1
        className="my-4 text-center text-primary"
        style={{ color: "rgb(241, 97, 38)" }}
      >
        Order Management
      </h1>
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn ${
            activeTab === "pending" ? "btn-primary" : "btn-outline-primary"
          } me-2`}
          style={
            activeTab === "pending"
              ? {
                  backgroundColor: "rgb(241, 97, 38)",
                  borderColor: "rgb(241, 97, 38)",
                }
              : {}
          }
          onClick={() => setActiveTab("pending")}
        >
          Pending Orders
        </button>
        <button
          className={`btn ${
            activeTab === "completed" ? "btn-primary" : "btn-outline-primary"
          }`}
          style={
            activeTab === "completed"
              ? {
                  backgroundColor: "rgb(241, 97, 38)",
                  borderColor: "rgb(241, 97, 38)",
                }
              : {}
          }
          onClick={() => setActiveTab("completed")}
        >
          Completed Orders
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div>
          {currentOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
          <DashboardPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      )}
    </div>
  );
}
