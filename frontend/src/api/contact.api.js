import axiosInstance from "./axiosInstance";

export const sendMessage = async (messageData) => {
  const response = await axiosInstance.post("/contact", messageData);
  return response.data;
};

export const getContacts = async () => {
  const response = await axiosInstance.get("/contact");
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axiosInstance.delete(`/contact/${id}`);
  return response.data;
};