import api from "./api";

export const productApi = {
  getAll: () => {
    return api.get("/products");
  },

  getById: (id: string | number) => {
    return api.get(`/products/${id}`);
  },

  create: (data: unknown) => {
    return api.post("/products", data);
  },

  update: (id: string | number, data: unknown) => {
    return api.put(`/products/${id}`, data);
  },

  delete: (id: string | number) => {
    return api.delete(`/products/${id}`);
  },
};