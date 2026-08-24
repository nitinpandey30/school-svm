import axiosInstance from "./axiosInstance";

export const getGallery = async () => {
  const response = await axiosInstance.get("/gallery");
  return response.data;
};

export const createGallery = async (galleryData) => {
  const response = await axiosInstance.post("/gallery", galleryData);
  return response.data;
};

export const updateGallery = async (id, galleryData) => {
  const response = await axiosInstance.put(
    `/gallery/${id}`,
    galleryData
  );

  return response.data;
};

export const deleteGallery = async (id) => {
  const response = await axiosInstance.delete(`/gallery/${id}`);
  return response.data;
};

export const deleteGalleryImage = async (galleryId, imageId) => {
  const response = await axiosInstance.delete(
    `/gallery/${galleryId}/image/${imageId}`
  );

  return response.data;
};