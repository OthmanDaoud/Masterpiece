import React from "react";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from "./App.jsx";
import "./index.css";
import "swiper/css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// Fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import SingleProduct from "./pages/Shop/SingleProduct.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import SingleBlog from "./pages/Blog/SingleBlog.jsx";
import About from "./pages/AboutPage/About.jsx";
import Contact from "./pages/ContactPage/Contact.jsx";
import CartPage from "./pages/Shop/CartPage.jsx";
import CheckoutPage from "./pages/Shop/CheckoutPage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import UserProfile from "./components/UserProfile.jsx";
import OrderConfirmation from "./pages/Shop/OrderConfirmation.jsx"; // New component for order confirmation
import Sidebar from "./dashboard/Sidebar.jsx";
import DashboardLayout from "./dashboard/DashboardLayout.jsx"; // Ensure this is imported
import Overview from "./dashboard/Overview.jsx";
import Users from "./dashboard/Users.jsx";
import Products from "./dashboard/Products.jsx";
import Orders from "./dashboard/Orders.jsx";
import Reviews from "./dashboard/Reviews.jsx";
import DashboardContact from "./dashboard/Contact.jsx"; // Rename to avoid confusion with Contact

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin/*", // Catch all sub-paths for admin
        element: (
          <DashboardLayout>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/admin/overview" replace />}
              />
              <Route path="overview" element={<Overview />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="contact" element={<DashboardContact />} />
              {/* 404 catch-all route */}
              <Route path="*" element={<div>404: Page Not Found</div>} />
            </Routes>
          </DashboardLayout>
        ),
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/check-out",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-confirmation/:orderId",
        element: (
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// Create PayPal options
const paypalOptions = {
  "client-id":
    "AXSHzO_ufOdxM-ouhu0UJ_8xAsr5RnrYC09jLAs5YTnLe97HTxEWyy7jXJ-Qm5Qh-Yid6GNCWX9DX807", // Store this in your .env file
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PayPalScriptProvider options={paypalOptions}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </AuthProvider>
);
