import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/PageHeader";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${orderId}`
        );
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center p-5">Order not found</div>;
  }

  return (
    <div>
      <PageHeader title="Order Confirmation" curPage="Order Confirmation" />
      <div className="container my-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center text-success mb-4">
              Thank you for your order!
            </h2>
            <div className="row">
              <div className="col-md-6">
                <h4>Order Details</h4>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Order Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="col-md-6">
                <h4>Shipping Address</h4>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p>
                  {order.shippingAddress.country},{" "}
                  {order.shippingAddress.zipCode}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4>Order Items</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
