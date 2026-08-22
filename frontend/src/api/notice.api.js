import axiosInstance from "./axiosInstance";

export const getNotices = async () => {
  const response = await axiosInstance.get("/notice");
  return response.data;
};

export const createNotice = async (noticeData) => {
  const response = await axiosInstance.post("/notice", noticeData);
  return response.data;
};

export const updateNotice = async (id, noticeData) => {
  const response = await axiosInstance.put(
    `/notice/${id}`,
    noticeData
  );

  return response.data;
};

export const deleteNotice = async (id) => {
  const response = await axiosInstance.delete(`/notice/${id}`);
  return response.data;
};