import { getToken } from "firebase/messaging";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { storeFcmTokenApi } from "./apis/api";
import Navbar from "./components/navbar/Navbar";
import { messaging } from "./firebase";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorBookingList from "./pages/admin/bookings/VendorBookingList";
import VendorDashboard from "./pages/admin/dashboard/VendorDashboard";
import VendorFutsalList from "./pages/admin/futsal/VendorFutsalList";
import VendorPaymentLogs from "./pages/admin/payments/VendorPaymentLogs";
import VendorProfile from "./pages/admin/profile/VendorProfile";
import SuperAdminProfile from "./pages/superadmin/SuperAdminProfile";
import SuperAdminDashboard from "./pages/superadmin/dashboard/Dashboard";
import FutsalList from "./pages/superadmin/futsal/FutsalList";
import PaymentLogs from "./pages/superadmin/payments/PaymentLogs";
import UserList from "./pages/superadmin/users/UserList";
import VendorList from "./pages/superadmin/vendors/VendorList";
import SuperAdminRoutes from "./protected/SuperAdminRoutes";
import VendorRoutes from "./protected/VendorRoutes";

function App() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BH8-93Eu9MnHlEYz2K6MzNG_JMeaDZ2OYrtoXB73Y_ZZssHLMrxQ1eekMi8yyIcEHsZXVgsvL6ey7hOHJvWIcwg",
      });
      localStorage.setItem("fcmToken", token);
      const data = {
        fcmToken: token,
      };
      storeFcmTokenApi(data).then((res) => {
        if (res.data.success) {
          console.log("fcm token stored");
        } else {
          console.log("Failed to store");
        }
      });
    }
  };
  useEffect(() => {
    if (localUser) {
      requestPermission();
    }
  }, [localUser]);
  return (
    <>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<Register />} />
              <Route
                path="/admin/forgot-password"
                element={<ForgotPassword />}
              />

              {/* Protected Vendor Routes */}
              <Route element={<VendorRoutes />}>
                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                <Route
                  path="/vendor/futsalList"
                  element={<VendorFutsalList />}
                />
                <Route
                  path="/vendor/bookingList"
                  element={<VendorBookingList />}
                />
                <Route
                  path="/vendor/paymentLogs"
                  element={<VendorPaymentLogs />}
                />
                <Route path="/vendor/profile" element={<VendorProfile />} />
              </Route>

              {/* Protected Super Admin Routes */}
              <Route element={<SuperAdminRoutes />}>
                <Route
                  path="/superadmin/dashboard"
                  element={<SuperAdminDashboard />}
                />
                <Route path="/superadmin/userlist" element={<UserList />} />
                <Route path="/superadmin/vendorList" element={<VendorList />} />
                <Route path="/superadmin/futsalList" element={<FutsalList />} />
                <Route
                  path="/superadmin/paymentLogs"
                  element={<PaymentLogs />}
                />
                <Route
                  path="/superadmin/profile"
                  element={<SuperAdminProfile />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
