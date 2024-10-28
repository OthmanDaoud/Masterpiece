import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  PieChart,
  Users,
  Package,
  ShoppingCart,
  Star,
  PhoneCall,
} from "lucide-react";

const sidebarItems = [
  { name: "Overview", icon: PieChart, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Reviews", icon: Star, path: "/admin/reviews" },
  { name: "Contact", icon: PhoneCall, path: "/admin/contact" },
];

const Sidebar = () => {
  const location = useLocation();

  const sidebarStyle = {
    width: "250px",
    minHeight: "100vh",
    backgroundColor: "rgb(241,97,38)",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const activeLinkStyle = {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "4px",
  };

  return (
    <div style={sidebarStyle} className="d-flex flex-column flex-shrink-0 p-3">
      <h1 className="fs-4 mb-4 fw-bold text-white">WarshtK Admin</h1>
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
            >
              <div className="p-2" style={isActive ? activeLinkStyle : {}}>
                <Icon size={20} className="me-2" />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
