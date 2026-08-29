import axiosInstance from "./axiosInstance";

export const getStats = async () => {
  const response = await axiosInstance.get("/stat");
  return response.data;
};

export const createStats = async (statsData) => {
  const response = await axiosInstance.post("/stat", statsData);
  return response.data;
};

export const updateStats = async (statsData) => {
  const response = await axiosInstance.put("/stat", statsData);
  return response.data;
};