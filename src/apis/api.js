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

// update user image api
export const updateUserImageApi = (id, formData) =>
  ApiWithFormData.put(`/api/user/uploadImage/${id}`, formData);

// update user detail api
export const editUserApi = (id, formData) =>
  Api.put(`/api/user/editProfile/${id}`, formData);

// update user password
export const editUserPassword = (id, formData) =>
  Api.put(`/api/user/editPassword/${id}`, formData);

// Store FCM Token for Notification
export const storeFcmTokenApi = (data) =>
  Api.put("/api/user/storeFCMToken", data, config);

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

// Superadmin apis

// All Futsal Api
export const getAllFutsalForSuperAdmin = (
  page,
  limit,
  searchQuery,
  startDate,
  endDate
) =>
  Api.get(
    `/api/superadmin/futsal/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );

// get futsal count and growth for admin
export const getFutsalCountAndGrowthForAdminApi = () =>
  Api.get("/api/superadmin/futsal/countAndGrowth", config);

// delete futsal by if for admin
export const deleteFutsalByIdForAdminApi = (id) =>
  Api.delete(`/api/superadmin/futsal/delete/${id}`, config);

// get all user data for admin
export const getAllUsersApi = (page, limit, searchQuery, startDate, endDate) =>
  Api.get(
    `/api/superadmin/user/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );

// get country count of user for admin
export const getCountryCountForUserApi = () =>
  Api.get("/api/superadmin/user/countryCount", config);

// get user data for graph for admin
export const getUserDataForGraphApi = () =>
  Api.get("/api/superadmin/user/countForGraph", config);

// get user count and growth for admin
export const getUserCountAndGrowthApi = () =>
  Api.get("/api/superadmin/user/countAndGrowth", config);

// get all vendor data for admin
export const getAllVendorsApi = (
  page,
  limit,
  searchQuery,
  startDate,
  endDate
) =>
  Api.get(
    `/api/superadmin/vendor/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );

// get country count of vendor for admin
export const getCountryCountForVendorApi = () =>
  Api.get("/api/superadmin/vendor/countryCount", config);

// get vendor data for graph for admin
export const getVendorDataForGraphApi = () =>
  Api.get("/api/superadmin/vendor/countForGraph", config);

// get vendor count and growth for admin
export const getVendorCountAndGrowthApi = () =>
  Api.get("/api/superadmin/vendor/countAndGrowth", config);

// change block status of user and vendor for admin
export const changeBlockUnblockStatusApi = (id) =>
  Api.get(`/api/superadmin/vendor/blockUnblock/${id}`, config);

// get all payment logs for admin
export const getAllPaymentLogsForAdmin = (
  page,
  limit,
  searchQuery,
  startDate,
  endDate
) =>
  Api.get(
    `/api/superadmin/paymentLogs/all?page=${page}&limit=${limit}&searchQuery=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
    config
  );

// get revenue totals for admin
export const getRevenueTotalsForAdminApi = () =>
  Api.get("/api/superadmin/paymentLogs/revenueTotal", config);

// get booking data for graph for admin
export const getBookingDataForGraphForAdminApi = () =>
  Api.get("/api/superadmin/booking/countForGraph", config);

// get booking count and growth for admin
export const getBookingCountAndGrowthForAdminApi = () =>
  Api.get("/api/superadmin/booking/countAndGrowth", config);

// get notification count and growth for admin
export const getNotificationCountAndGrowthForAdminApi = () =>
  Api.get("/api/superadmin/notification/countAndGrowth", config);
