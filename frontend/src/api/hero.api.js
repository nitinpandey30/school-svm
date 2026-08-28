import axiosInstance from "./axiosInstance";


// Public - Home page
export const getHeroes = async () => {
  const response = await axiosInstance.get("/hero");
  return response.data;
};


// Admin - all heroes
export const getAllHeroes = async () => {
  const response = await axiosInstance.get("/hero/all");
  return response.data;
};


// Admin - create hero
export const createHero = async (heroData) => {
  const response = await axiosInstance.post("/hero", heroData);
  return response.data;
};


// Admin - update hero
export const updateHero = async (id, heroData) => {
  const response = await axiosInstance.put(`/hero/${id}`, heroData);
  return response.data;
};


// Admin - delete hero
export const deleteHero = async (id) => {
  const response = await axiosInstance.delete(`/hero/${id}`);
  return response.data;
};