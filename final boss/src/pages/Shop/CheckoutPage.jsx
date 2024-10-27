import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { MdDownload } from "react-icons/md"; // Download icon
import jsPDF from "jspdf";

const Checkout = (cartItems) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const navigate = useNavigate();
  const products = cartItems.cartItems;
  const totalAmount = cartItems.totalPrice;

  const generatePDF = (orderDetails) => {
    console.log("orderDetails", orderDetails);
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Receipt", 10, 10);
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderDetails.orderId}`, 10, 30);
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 10, 40);
    doc.text(`Total Price: $${orderDetails.totalAmount.toFixed(2)}`, 10, 50);
    doc.text("Products:", 10, 60);

    orderDetails.products.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.name} - Quantity: ${product.quantity}`,
        10,
        70 + index * 10
      );
    });

    doc.text(
      "The order will take 2 days of work. We will contact you as soon as possible.",
      10,
      90 + orderDetails.products.length * 10
    );

    return doc;
  };

  const handleDownloadPDF = () => {
    if (pdfDoc) {
      pdfDoc.save("order_receipt.pdf");
    }
  };

  const handlePaymentSuccess = async (details, data) => {
    setLoading(true);
    try {
      const orderData = {
        products: products.map((p) => ({
          product: p.id,
          quantity: p.quantity,
        })),
        totalAmount,
        paymentStatus: "Pending",
        paypalPaymentId: data.paymentID,
        paypalOrderId: data.orderID,
      };
      const response = await axios.post(
        "http://localhost:3000/api/orders/create",
        orderData,
        { withCredentials: true }
      );
      const orderId = response.data._id;

      // Generate PDF and store it in state
      const orderDetails = {
        orderId,
        totalAmount,
        products,
      };
      const doc = generatePDF(orderDetails);
      setPdfDoc(doc);
      setPaymentSuccess(true);
      console.log("Order created successfully:", response.data);

      // Remove cart items from local storage
      localStorage.removeItem("cart"); // Ensure this matches the key you used to store the cart

      // Automatically navigate to "/shop" after 15 seconds
      setTimeout(() => {
        navigate("/shop");
      }, 15000);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center">Checkout</h2>

          {paymentSuccess ? (
            <div className="text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="h5 text-success">Payment Successful!</p>
              <p className="small mt-2">
                Thank you for your purchase. You will be redirected to the shop
                shortly.
              </p>
              <div className="card mt-4 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">Download Receipt</h5>
                  <p className="card-text">
                    Click the icon below to download your order receipt.
                  </p>
                  <MdDownload
                    size={48}
                    style={{ cursor: "pointer", color: "#28a745" }} // Change color as needed
                    onClick={handleDownloadPDF}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="border p-3 rounded mb-4">
                <h4 className="h6 font-weight-bold">Order Summary</h4>
                <ul className="list-group mb-2">
                  {products.map((product, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{product.name}</span>
                      <span>x{product.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="h5 font-weight-bold">
                  Total Amount: ${totalAmount.toFixed(2)}
                </div>
                <small className="text-muted">
                  Your total amount includes taxes and shipping.
                </small>
              </div>

              {loading && (
                <div className="progress mb-4">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              )}

              <div className="bg-light p-3 rounded">
                <h4 className="h6 font-weight-bold">Payment Method</h4>
                <p>Please complete your payment through PayPal.</p>
                <PayPalButton
                  amount={totalAmount}
                  onSuccess={handlePaymentSuccess}
                  options={{
                    clientId:
                      "AXSHzO_ufOdxM-ouhu0UJ_8xAsr5RnrYC09jLAs5YTnLe97HTxEWyy7jXJ-Qm5Qh-Yid6GNCWX9DX807",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
