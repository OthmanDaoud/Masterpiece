import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const title = "Login";
const socialTitle = "Login With Google";
const btnText = "Log In";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Check if the user is already logged in
    const token = Cookies.get("token");
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData,
        {
          withCredentials: true,
        }
      );

      // Store token and user_id in cookies
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
      }

      // Show success alert and navigate to the home page
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: response.data.message,
        confirmButtonText: "OK",
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.response?.data?.message || "Error logging in.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section padding-tb section-bg">
      <div className="container">
        <div className="account-wrapper">
          <h3 className="title">{title}</h3>
          <form className="account-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              {errorMessage && (
                <div className="error-message text-danger">{errorMessage}</div>
              )}
            </div>
            <div className="form-group">
              <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                <div className="checkgroup">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <Link to="/forgetpass">Forget Password?</Link>
              </div>
            </div>
            <div className="form-group text-center">
              <button className="d-block lab-btn" type="submit">
                <span>{loading ? "Logging in..." : btnText}</span>
              </button>
            </div>
          </form>
          <div className="account-bottom">
            <span className="d-block cate pt-10">
              Don’t Have an Account? <Link to="/sign-up">Sign Up</Link>
            </span>
            {/* <span className="or">
              <span>or</span>
            </span> */}
            {/* <h5 className="subtitle">{socialTitle}</h5> */}
            {/* <ul className="lab-ul social-icons justify-content-center">
              <li>
                <button className="github">
                  <i className="icofont-github"></i>
                </button>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
