import React from "react";

const OrderCard = ({ order, onStatusChange, isPending }) => (
  <div className="card h-100 shadow-sm hover-shadow">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="card-title">{order.user.username}</h5>
        <span
          className={`badge ${
            order.paymentStatus === "Completed" ? "bg-success" : "bg-warning"
          }`}
        >
          {order.paymentStatus}
        </span>
      </div>
      <p className="text-muted">{order.user.email}</p>
      <h4 className="mb-3">${order.totalAmount.toFixed(2)}</h4>

      <h6 className="mb-2">Products:</h6>
      <ul className="list-unstyled">
        {order.products.map((item) => (
          <li key={item.product._id} className="d-flex justify-content-between">
            <span>
              {item.product.name} (x{item.quantity})
            </span>
            <span className="fw-bold">${item.product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {isPending && (
        <button
          className="btn btn-primary w-100 mt-3"
          style={{
            background: "linear-gradient(to right, #116A7B, #122e33)",
            border: "none",
          }}
          onClick={() => onStatusChange(order._id)}
        >
          Mark as Completed
        </button>
      )}
    </div>
  </div>
);
