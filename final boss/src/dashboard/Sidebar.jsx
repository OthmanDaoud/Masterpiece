import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  PieChart,
  Users,
  Package,
  ShoppingCart,
  Star,
  PhoneCall,
  Menu,
  X,
} from "lucide-react";

const sidebarItems = [
  { name: "Overview", icon: PieChart, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Reviews", icon: Star, path: "/admin/reviews" },
  // { name: "Contact", icon: PhoneCall, path: "/admin/contact" },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    width: isOpen ? "250px" : "100px",
    minHeight: "100vh",
    backgroundColor: "rgb(241,97,38)",
    color: "white",
    transition: "all 0.3s ease-in-out",
    position: isMobile ? "fixed" : "relative",
    zIndex: 1000,
    left: isMobile && !isOpen ? "-100px" : "0",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  const activeLinkStyle = {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "4px",
  };

  const toggleButtonStyle = {
    position: "absolute",
    right: isMobile ? "-40px" : "-20px",
    top: "10px",
    background: "rgb(241,97,38)",
    border: "none",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: isMobile ? "0 8px 8px 0" : "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1001,
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 999 }}
          onClick={toggleSidebar}
        />
      )}

      <div
        style={sidebarStyle}
        className="d-flex flex-column flex-shrink-3 p-3"
      >
        <button
          style={toggleButtonStyle}
          onClick={toggleSidebar}
          className="d-flex align-items-center justify-content-center"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1 className={`fs-4 mb-4 fw-bold text-white ${!isOpen && "d-none"}`}>
          WarshtK Admin
        </h1>

        <nav className="nav nav-pills flex-column">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                style={linkStyle}
                className={`nav-link d-flex align-items-center mb-2 ${
                  isActive ? "active" : ""
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <div
                  className="p-2 d-flex align-items-center"
                  style={{
                    ...(isActive ? activeLinkStyle : {}),
                    marginTop: isOpen ? "0" : "px", // Adjust this value to lower the icons when closed
                  }}
                >
                  <Icon size={20} className={isOpen ? "me-2" : ""} />
                  <span className={!isOpen ? "d-none" : ""}>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
