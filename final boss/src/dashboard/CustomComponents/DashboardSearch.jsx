// DashboardSearch.js
import React from "react";
import { BsSearch } from "react-icons/bs"; // Ensure to install react-icons

const DashboardSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="input-group mb-4">
      <span
        className="input-group-text"
        style={{
          backgroundColor: "rgb(241, 97, 38)",
          border: "none",
          color: "#fff",
        }}
      >
        <BsSearch />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          border: "2px solid rgb(241, 97, 38)",
          borderRadius: "0.25rem",
        }}
      />
    </div>
  );
};

export default DashboardSearch;
