import React from "react";

const GradientButton = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`btn ${
      isActive ? "btn-primary" : "btn-secondary"
    } rounded-pill px-4 py-2`}
    style={{
      background: isActive ? "linear-gradient(to right, #116A7B, #122e33)" : "",
      border: "none",
    }}
  >
    {children}
  </button>
);
