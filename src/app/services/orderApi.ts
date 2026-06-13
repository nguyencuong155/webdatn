import api from "./api";

export const orderApi = {
  create: (data: unknown) => {
    return api.post("/orders", data);
  },

  getMyOrders: () => {
    return api.get("/orders/my-orders");
  },

  getAll: () => {
    return api.get("/orders");
  },

  updateStatus: (id: string | number, status: string) => {
    return api.put(`/orders/${id}/status`, { status });
  },

  delete: (id: string | number) => {
    return api.delete(`/orders/${id}`);
  },
};