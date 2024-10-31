import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({ title, value, icon, color }) => (
  <div className={`card text-white mb-3`} style={{ backgroundColor: color }}>
    <div className="card-header d-flex justify-content-between">
      <h5 className="card-title">{title}</h5>
      <i className={`bi bi-${icon}`} style={{ fontSize: "1.5rem" }}></i>
    </div>
    <div className="card-body">
      <h2 className="card-text">{value}</h2>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({ users: 0, orders: 0, feedbacks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, ordersRes, feedbacksRes] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/users"),
        axios.get("http://localhost:3000/api/admin/orders/completed"),
        axios.get("http://localhost:3000/api/admin/reviews"),
      ]);

      setData({
        users: usersRes.data.length,
        orders: ordersRes.data.length,
        feedbacks: feedbacksRes.data.length,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    { name: "Users", value: data.users },
    { name: "Orders", value: data.orders },
    { name: "Feedbacks", value: data.feedbacks },
  ];

  const filteredChartData =
    activeTab === "all"
      ? chartData
      : chartData.filter((item) => item.name.toLowerCase() === activeTab);

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-4">
        <div className="col-md-4">
          <StatCard
            title="Total Users"
            value={data.users}
            icon="people"
            color="#198754"
          />
        </div>
        <div className="col-md-4">
          <StatCard
            title="Total Orders"
            value={data.orders}
            icon="cart"
            color="#0d6efd"
          />
        </div>
        <div className="col-md-4">
          <StatCard
            title="Total Feedbacks"
            value={data.feedbacks}
            icon="chat"
            color="#ffc107"
          />
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Overview Statistics</h5>
          <div className="btn-group mt-2" role="group">
            {["all", "users", "orders", "feedbacks"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`btn ${
                  activeTab === tab ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-end">
        <button
          onClick={fetchData}
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Refreshing...
            </>
          ) : (
            "Refresh Data"
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
