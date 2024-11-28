import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const title = "Register Now";
const socialTitle = "Register With Google";
const btnText = "Sign Up";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData,
        { withCredentials: true }
      );

      setIsOtpSent(true);
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: response.data.message || "OTP has been sent to your email.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Error",
        text:
          error.response?.data?.message ||
          "There was an error during signup. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/verify-otp",
        { email: formData.email, otp },
        { withCredentials: true }
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
      }

      Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text:
          response.data.message ||
          "OTP verified successfully. Welcome to our website!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Navigate to the homepage or dashboard after successful verification
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      Swal.fire({
        icon: "error",
        title: "Verification Error",
        text:
          error.response?.data?.message ||
          "OTP verification failed. Please check your OTP and try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-section padding-tb section-bg">
      <div className="container">
        <div className="account-wrapper">
          <h3 className="title">{isOtpSent ? "Verify Your OTP" : title}</h3>
          {!isOtpSent ? (
            <form className="account-form" onSubmit={handleSignup}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="User Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {/* Error message */}
              <div>
                {errorMessage && (
                  <div className="error-message text-danger">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="form-group">
                <button className="lab-btn" disabled={loading}>
                  <span>{loading ? "Signing Up..." : btnText}</span>
                </button>
              </div>
            </form>
          ) : (
            <form className="account-form" onSubmit={handleOtpVerification}>
              <div className="form-group">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="lab-btn" disabled={loading}>
                  <span>{loading ? "Verifying OTP..." : "Verify OTP"}</span>
                </button>
              </div>
            </form>
          )}
          {/* Bottom Section */}
          <div className="account-bottom">
            {!isOtpSent ? (
              <>
                <span className="d-block cate pt-10">
                  Are you a member? <Link to="/login">Login</Link>
                </span>
                {/* <span className="or">
                  <span>or</span>
                </span>
                <h5 className="subtitle">{socialTitle}</h5> */}
              </>
            ) : (
              <span className="d-block cate pt-10">
                Didn’t receive OTP?{" "}
                <button className="resend-otp" onClick={handleSignup}>
                  Resend OTP
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
