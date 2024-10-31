import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

export const orderService = {
  getPendingOrders: async () => {
    const response = await axios.get(`${API_URL}/orders/pending`);
    return response.data;
  },

  getCompletedOrders: async () => {
    const response = await axios.get(`${API_URL}/orders/completed`);
    return response.data;
  },

  updateOrderStatus: async (orderId) => {
    const response = await axios.patch(`${API_URL}/orders/${orderId}`, {
      paymentStatus: "Completed",
    });
    return response.data;
  },
};
