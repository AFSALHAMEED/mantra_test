import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

type FormValues = {
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

type bookValues = {
  firstName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: string;
  numberOfRooms: string;
  resortName: string;
};

export const login = async (payload: { email: string; password: string }) => {
  const data = await axios.post("/api/customer/login", payload);
  return data.data;
};

export const register = async (payload: FormValues) => {
  const data = await axios.post("/api/customer/register", payload);
  return data.data;
};

export const bookResort = async (payload: bookValues) => {
  const data = await axios.post("/api/book/add-book", payload);
  return data.data;
};

export const getMyBookings = async (email: { email: string }) => {
  const data = await axios.get(`/api/book/my-booking?email=${email}`);
  return data.data;
};

export const logoutUser = async () => {
  const data = await axios.get(`/api/customer/logout`);
  return data.data;
};
