import axiosInstance from "./axiosInstance";

export const getEvents = async () => {
  const response = await axiosInstance.get("/event");
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axiosInstance.post("/event", eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axiosInstance.put(
    `/event/${id}`,
    eventData
  );

  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`/event/${id}`);
  return response.data;
};