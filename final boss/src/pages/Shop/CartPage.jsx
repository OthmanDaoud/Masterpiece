import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../../assets/images/shop/del.png";
import CheckoutPage from "./CheckoutPage";
import { Modal, Button } from "react-bootstrap";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
    updateLocalStorage(cartItems);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);
      updateLocalStorage(cartItems);
    }
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setShowCheckout(false);
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  const orderTotal = cartSubtotal;

  const handleConfirmOrder = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className="bg-gray-50">
      <PageHeader title="Shopping Cart" curPage="Cart Page" />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="bg-light">
                      <tr>
                        <th className="cat-product">Product</th>
                        <th className="cat-price">Price</th>
                        <th className="cat-quantity">Quantity</th>
                        <th className="cat-toprice">Total</th>
                        <th className="cat-edit">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, indx) => (
                        <tr key={indx}>
                          <td className="product-item cat-product">
                            <div className="d-flex align-items-center">
                              <div className="p-thumb me-3">
                                <Link to="/shop-single">
                                  <img
                                    src={`${item.img}`}
                                    alt=""
                                    className="rounded"
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </Link>
                              </div>
                              <div className="p-content">
                                <Link
                                  to="/shop-single"
                                  className="text-decoration-none"
                                >
                                  <h6 className="mb-0">{item.name}</h6>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="cat-price">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="cat-quantity">
                            <div
                              className="input-group"
                              style={{ width: "120px" }}
                            >
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleDecrease(item)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="form-control text-center"
                                value={item.quantity}
                                readOnly
                              />
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleIncrease(item)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="cat-toprice fw-bold">
                            ${calculateTotalPrice(item).toFixed(2)}
                          </td>
                          <td className="cat-edit">
                            <button
                              className="btn btn-link text-danger"
                              onClick={() => handleRemoveItem(item)}
                            >
                              <img
                                src={delImgUrl}
                                alt="remove"
                                style={{ width: "20px" }}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {cartItems.length > 0 && (
                  <div className="card mt-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Order Summary</h5>
                        <h5 className="mb-0">
                          Total: ${orderTotal.toFixed(2)}
                        </h5>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <form className="cart-checkout" action="/shop">
                          <input
                            type="submit"
                            value="Update Cart"
                            className="btn btn-outline-primary btn-lg px-4 py-2 fw-bold"
                          />
                        </form>

                        <button
                          onClick={handleConfirmOrder}
                          className="btn btn-success btn-lg px-4 py-2 fw-bold"
                          disabled={cartItems.length === 0}
                        >
                          Confirm Order
                        </button>

                        <button
                          onClick={handleClearCart}
                          className="btn btn-outline-danger btn-lg px-4 py-2 fw-bold"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {cartItems.length === 0 && (
                  <div className="text-center py-5">
                    <h4 className="text-muted">Your cart is empty</h4>
                    <Link to="/shop">
                      <input
                        type="submit"
                        value="Continue Shopping"
                        className="btn btn-outline-primary btn-lg px-4 py-2 fw-bold"
                      />{" "}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Checkout */}
        <Modal show={showCheckout} onHide={handleCloseCheckout} centered>
          <Modal.Header closeButton>
            <Modal.Title>Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CheckoutPage
              cartItems={cartItems}
              clearCart={handleClearCart}
              totalPrice={orderTotal}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCheckout}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CartPage;
