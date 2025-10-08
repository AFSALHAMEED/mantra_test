import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const getAllBooking = async (payload: {
  pageIndex: number;
  pageSize: number;
}) => {
  const data = await axios.get(
    `/api/book/allBookingList?page=${payload.pageIndex}&limit=${payload.pageSize}`
  );
  return data.data;
};
