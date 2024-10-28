import React from "react";
import { motion } from "framer-motion";

const DashboardPagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        // Show first 5 pages + ellipsis + last page
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page + ellipsis + last 5 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // Show first + ellipsis + current-1 to current+1 + ellipsis + last
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }

    return pages;
  };

  const baseButtonStyle = `
    btn rounded-pill shadow-sm border-0 px-4 py-2 fw-medium
    d-inline-flex align-items-center justify-content-center
    text-decoration-none position-relative
    transition-all duration-300
  `;

  const activeButtonStyle = `
    btn-primary
    ${baseButtonStyle}
  `;

  const inactiveButtonStyle = `
    btn-outline-primary
    ${baseButtonStyle}
  `;

  const disabledButtonStyle = `
    btn-light text-muted
    ${baseButtonStyle}
  `;

  return (
    <div className="d-flex align-items-center justify-content-center mt-4 gap-2 pagination-container">
      {/* First Page Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={
          currentPage === 1 ? disabledButtonStyle : inactiveButtonStyle
        }
      >
        <i className="bi bi-chevron-double-left me-1"></i>
        First
      </motion.button>

      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={
          currentPage === 1 ? disabledButtonStyle : inactiveButtonStyle
        }
      >
        <i className="bi bi-chevron-left"></i>
        Prev
      </motion.button>

      {/* Page Numbers */}
      <div className="d-flex gap-2">
        {generatePageNumbers().map((page, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              typeof page === "number" ? onPageChange(page) : null
            }
            disabled={page === "..."}
            className={`
              ${
                page === currentPage
                  ? activeButtonStyle
                  : page === "..."
                  ? disabledButtonStyle
                  : inactiveButtonStyle
              }
              min-w-[40px]
            `}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages ? disabledButtonStyle : inactiveButtonStyle
        }
      >
        Next
        <i className="bi bi-chevron-right ms-1"></i>
      </motion.button>

      {/* Last Page Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages ? disabledButtonStyle : inactiveButtonStyle
        }
      >
        Last
        <i className="bi bi-chevron-double-right ms-1"></i>
      </motion.button>
    </div>
  );
};

export default DashboardPagination;
