import axiosInstance from "./axiosInstance";

export const getFees = async () => {
  const response = await axiosInstance.get("/fee");
  return response.data;
};

export const createFee = async (feeData) => {
  const response = await axiosInstance.post("/fee", feeData);
  return response.data;
};

export const updateFee = async (id, feeData) => {
  const response = await axiosInstance.put(`/fee/${id}`, feeData);
  return response.data;
};

export const deleteFee = async (id) => {
  const response = await axiosInstance.delete(`/fee/${id}`);
  return response.data;
};