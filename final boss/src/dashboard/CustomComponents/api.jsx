import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const api = {
  getAllProducts: () => axios.get(`${API_BASE_URL}/admin/products`),
  getProduct: (id) => axios.get(`${API_BASE_URL}/admin/products/${id}`),
  createProduct: (data) => axios.post(`${API_BASE_URL}/admin/products`, data),
  updateProduct: (id, data) =>
    axios.put(`${API_BASE_URL}/admin/products/${id}`, data),
  deleteProduct: (id) => axios.delete(`${API_BASE_URL}/admin/products/${id}`),
};
