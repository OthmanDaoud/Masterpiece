// dashboard/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        {children}{" "}
        {/* This will render any child components passed to the layout */}
      </div>
    </div>
  );
};

export default DashboardLayout;
