import axiosInstance from "./axiosInstance";

export const sendMessage = async (messageData) => {
  const response = await axiosInstance.post("/contact", messageData);
  return response.data;
};