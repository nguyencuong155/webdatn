import api from "./api";

export const chatApi = {
  sendMessage: (message: string) => {
    return api.post("/chat", { message });
  },

  getHistory: () => {
    return api.get("/chat/history");
  },
};