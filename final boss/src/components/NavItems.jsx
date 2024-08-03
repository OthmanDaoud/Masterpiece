import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../contexts/AuthProvider";
import { NavDropdown } from "react-bootstrap";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);

  // check if user is register
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFiexd(true);
    } else {
      setHeaderFiexd(false);
    }
  });

  return (
    <header
      className={`header-section style-4 ${
        headerFiexd ? "header-fixed fadeInUp" : ""
      }`}
      style={{ backgroundColor: "#06113C" }}
    >
      {/* ------ header top: first div ----- */}
      <div
        className={`header-top d-md-none ${socialToggle ? "open" : ""}`}
        style={{ color: "#ffffff" }}
      >
        <div className="container">
          <div className="header-top-area">
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
          </div>
        </div>
      </div>

      {/* header top ends */}

      {/* ---header bottom starts */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    className="navbar-brand"
                    style={{ maxHeight: "50px" }}
                  />
                  <span className="ms-2 fs-4 fw-bold text-white">warshtK</span>
                </Link>
              </div>
            </div>

            {/* menu area */}
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
                    <Link to="/blog" style={{ color: "#ffffff" }}>
                      Blog
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

              {/* users when user available */}
              {user ? (
                <>
                  <div>
                    {user?.photoURL ? (
                      <img
                        src={user?.photoURL}
                        className="nav-profile"
                        alt="Profile"
                      />
                    ) : (
                      <img
                        src="/src/assets/images/author/01.jpg"
                        className="nav-profile"
                        alt="Profile"
                      />
                    )}
                  </div>
                  <NavDropdown
                    id="basic-nav-dropdown"
                    className="custom-dropdown"
                    style={{ color: "#ffffff" }}
                  >
                    <NavDropdown.Item
                      href="#action/3.1"
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
                    <NavDropdown.Item href="#action/3.3">
                      Profile
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
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

              {/* menu toggle btn */}
              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler */}
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
      {/* header bottom ends */}
    </header>
  );
};

export default NavItems;
