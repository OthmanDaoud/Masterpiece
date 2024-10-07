import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock login function
  const login = (email, password) => {
    setLoading(true);
    // Example login logic: Here you can replace with your own authentication logic
    if (email === "test@example.com" && password === "password123") {
      const mockUser = { name: "Sample User", email };
      Cookies.set("user-token", "mockToken123"); // Save token to cookies
      setUser(mockUser);
      setLoading(false);
      return Promise.resolve(mockUser);
    } else {
      setLoading(false);
      return Promise.reject("Invalid credentials");
    }
  };

  // Mock logout function
  const logOut = () => {
    setLoading(true);
    Cookies.remove("user-token"); // Remove token from cookies
    setUser(null);
    setLoading(false);
  };

  // Check for user token in cookies on initial load
  useEffect(() => {
    const token = Cookies.get("user-token");
    if (token) {
      setUser({ name: "Sample User", email: "test@example.com" }); // Replace with real user fetching logic
    }
    setLoading(false);
  }, []);

  // AuthContext values to pass to consumers
  const authInfo = { user, setUser, loading, login, logOut };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
