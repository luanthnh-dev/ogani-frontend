import axiosClient from './axiosClient';

const ORDER_API = {
  createNewOrder: async (order) => {
    try {
      console.log(order);
      const res = await axiosClient.post(`/orders/`, order);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      const res = await axiosClient.get(`/orders/${orderId}/`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getAllOrderDetails: async (orderId) => {
    try {
      const res = await axiosClient.get(`/orders/${orderId}/detail/`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getOrderDetail: async (orderId, orderDetailId) => {
    try {
      const res = await axiosClient.get(`/orders/${orderId}/detail/${orderDetailId}/`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  updateOrderDetail: async (orderId, orderDetailId, data) => {
    try {
      const res = await axiosClient.put(`/orders/${orderId}/detail/${orderDetailId}/`, data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  deleteOrderDetail: async (orderId, orderDetailId) => {
    try {
      const res = await axiosClient.delete(`/orders/${orderId}/detail/${orderDetailId}/`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default ORDER_API;
