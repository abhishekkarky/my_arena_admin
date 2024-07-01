import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiWithFormData = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Token
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Register User Api
export const registerUserApi = (data) => Api.post("/api/user/register", data);

// Number Verification Api
export const verifyNumberApi = (data) =>
  Api.post("/api/user/number-verify", data);

// Login User Api
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// Get User by Id Api
export const getUserByIdApi = (id) =>
  Api.get(`/api/user/getUserById/${id}`, config);

// Vendor Futsal Apis

// Add Futsal Api
export const addFutsalApi = (data) =>
  ApiWithFormData.post("/api/futsal/add", data, config);

// Get All Futsal Api
export const getAllFutsalApi = (page, limit, searchQuery) =>
  Api.get(
    `/api/futsal/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}`,
    config
  );

// get futsal by id
export const getFutsalByIdApi = (id) =>
  Api.get(`/api/futsal/get/${id}`, config);

// Update Futsal Api
export const updateFutsalApi = (id, data) =>
  ApiWithFormData.put(`/api/futsal/update/${id}`, data, config);

// Delete Futsal Api
export const deleteFutsalByIdApi = (id) =>
  Api.delete(`/api/futsal/delete/${id}`, config);

// Futsal Counts for Graph Api
export const getFutsalCountForGraphApi = () =>
  Api.get("/api/futsal/countForGraph", config);

// Get Futsal Count and Growth Api
export const getFutsalCountAndGrowthApi = () =>
  Api.get("/api/futsal/countAndGrowth", config);

// Vendor Booking Apis

// creating booking api for vendor
export const createBookingApi = (data) =>
  Api.post("/api/booking/add", data, config);

// Get All Bookings Api
export const getAllBookingsApi = (
  page,
  limit,
  searchQuery,
  startDate,
  endDate
) =>
  Api.get(
    `/api/booking/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );

// Fetch All futsals for booking
export const getAllFutsalForBookingApi = () =>
  Api.get("/api/futsal/forBooking", config);

// Booking Counts for Graph Api
export const getBookingsCountForGraphApi = () =>
  Api.get("/api/booking/countForGraph", config);

// Get Booking Count and Growth Api
export const getBookingsCountAndGrowthApi = () =>
  Api.get("/api/booking/countAndGrowth", config);

// Fetch All Available slots for booking
export const getAllAvailableTimeSlotsApi = (futsalId, date) =>
  Api.get(
    `/api/booking/timeSlotForBooking?futsalId=${futsalId}&date=${date}`,
    config
  );

// Delete booking by id Api
export const deleteBookingbyId = (id) =>
  Api.delete(`/api/booking/delete/${id}`, config);


// creating Notification Routes for vendor

// Get Notification Count and Growth for vendor
export const getNotificationCountAndGrowthApi = () =>
  Api.get("/api/notification/countAndGrowth", config);

// Creating payment log routes for vendor

// Get All payment logs
export const getAllPaymentLogsApi = (
  page,
  limit,
  searchQuery,
  startDate,
  endDate
) =>
  Api.get(
    `/api/paymentLog/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );

// Get Payment Total in dashboard
export const getRevenueTotalsApi = () =>
  Api.get("/api/paymentLog/revenueTotals", config);

// Get Revenue Data for Graph
export const getRevenueDataForGraphApi = () =>
  Api.get("/api/paymentLog/revenueForGraph", config);

// Superadmin futsal apis

// All Futsal Api
export const getAllFutsalForSuperAdmin = (
  page,
  limit,
  searchQuery,
  startDate,
  endDate
) =>
  Api.get(
    `/api/futsal/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );
