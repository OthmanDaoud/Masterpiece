import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"; // Import the js-cookie library
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../contexts/AuthProvider";
import { NavDropdown } from "react-bootstrap";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const { user, setUser } = useContext(AuthContext); // Ensure setUser is available in your context
  const navigate = useNavigate(); // Use React Router's navigate hook for redirection
  const location = useLocation(); // Get the current location

  const isAdminPath = location.pathname.startsWith("/admin"); // Check if the current path starts with "/admin"

  if (isAdminPath) return null;

  // Check if the user is logged in based on cookies
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("token");

      if (token) {
        setIsLoggedIn(true);
        // If token exists, set user state accordingly
        // You can fetch user data from your API here if needed
        setUser({}); // Set user object with appropriate user data if you have it
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();
    // Check login status whenever the component mounts or the route changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [setUser]);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token on logout
    setIsLoggedIn(false); // Update login status
    setUser(null); // Reset user state on logout
    navigate("/"); // Redirect to the homepage
    // Trigger a custom event to force a re-check of login status
    window.dispatchEvent(new Event("storage"));
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
      style={{ backgroundColor: "#06113C" }}
    >
      {/* Header Top Section for Mobile */}
      <div
        className={`header-top d-md-none ${socialToggle ? "open" : ""}`}
        style={{ color: "#ffffff" }}
      >
        <div className="container">
          <div className="header-top-area">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/signup"
                  className="lab-btn me-3"
                  style={{ color: "#ffffff" }}
                >
                  <span>Create Account</span>
                </Link>
                <Link to="/login" style={{ color: "#ffffff" }}>
                  Log In
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="lab-btn me-3"
                style={{ backgroundColor: "#FF0000", color: "#ffffff" }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Header Bottom Section */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* Logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    className="navbar-brand"
                    style={{ maxHeight: "50px" }}
                  />
                  <span className="ms-2 fs-4 fw-bold text-white">WarshtK</span>
                </Link>
              </div>
            </div>

            {/* Menu Area */}
            <div className="menu-area">
              <div className="menu">
                <ul
                  className={`lab-ul ${menuToggle ? "active" : ""}`}
                  style={{ color: "#ffffff" }}
                >
                  <li>
                    <Link to="/" style={{ color: "#ffffff" }}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" style={{ color: "#ffffff" }}>
                      Shop
                    </Link>
                  </li>
                  <li>
                    <NavLink to="/about" style={{ color: "#ffffff" }}>
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" style={{ color: "#ffffff" }}>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Conditional Rendering of User Options */}
              {isLoggedIn ? (
                <>
                  {/* Show user profile dropdown */}
                  <NavDropdown
                    id="basic-nav-dropdown"
                    className="custom-dropdown"
                    style={{
                      color: "#ffffff",
                      backgroundColor: "rgb(243,132,24)",
                      borderRadius: "5px",
                      width: "15px",
                      textAlign: "center",
                    }}
                  >
                    <NavDropdown.Item
                      onClick={handleLogout}
                      className="custom-logout"
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#FF0000",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/cart-page">
                      Shopping Cart
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {/* Show Sign Up and Log In buttons */}
                  <Link
                    to="/sign-up"
                    className="lab-btn me-3 d-none d-md-block"
                    style={{
                      color: "#ffffff",
                      backgroundColor: "rgb(243,132,24)",
                    }}
                  >
                    <span>Create Account</span>
                  </Link>
                  <Link
                    to="/login"
                    className="d-none d-md-block"
                    style={{ color: "#ffffff" }}
                  >
                    Log In
                  </Link>
                </>
              )}

              {/* Menu Toggle Button for Mobile */}
              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* Social Toggler for Mobile */}
              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i
                  className="icofont-info-square"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
