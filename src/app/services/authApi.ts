import api from "./api";

export const authApi = {
  login: (data: { email: string; password: string }) => {
    return api.post("/auth/login", data);
  },

  register: (data: { name: string; email: string; password: string }) => {
    return api.post("/auth/register", data);
  },
};