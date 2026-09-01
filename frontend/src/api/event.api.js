import axiosInstance from "./axiosInstance";

// Public - active events
export const getEvents = async () => {
  const response = await axiosInstance.get("/event");
  return response.data;
};

// Public - single event
export const getEventById = async (id) => {
  const response = await axiosInstance.get(`/event/${id}`);
  return response.data;
};

// Admin - all events
export const getAllEvents = async () => {
  const response = await axiosInstance.get("/event/all");
  return response.data;
};

// Admin - create event
export const createEvent = async (eventData) => {
  const response = await axiosInstance.post("/event", eventData);
  return response.data;
};

// Admin - update event
export const updateEvent = async (id, eventData) => {
  const response = await axiosInstance.put(`/event/${id}`, eventData);
  return response.data;
};

// Admin - delete event
export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`/event/${id}`);
  return response.data;
};