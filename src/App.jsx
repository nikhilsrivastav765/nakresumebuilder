import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import BrowseLayouts from "./pages/Navigation/BrowseLayouts";
import ContactUs from "./pages/Navigation/ContactUs";
import Home from "./pages/Navigation/Home";
import LocomotiveScroll from "locomotive-scroll";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAuth } from "./components/auth/AuthContext";
import LoadingScreen from "./components/common/LoadingScreen";
import Auth from "./components/auth/Auth";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import ModernTemp from "./pages/Templates/ModernTemp"
import ClassicTemp from "./pages/Templates/ClassicTemp";
import CreativeTemp from "./pages/Templates/CreativeTemp";
import AdminDashboard from "./user/AdminDashboard";
import AdminLogin from "./pages/Navigation/AdminLogin";
const AUTO_LOGOUT_TIME = 10 * 60 * 1000;
const App = () => {

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const scroll = new LocomotiveScroll();
    return () => scroll.destroy();
  }, []);

  const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbarFooter = (location.pathname === "/auth" || location.pathname === "/admin" || location.pathname === "/admin-login");
    const hideFooterOnly = (location.pathname === "/dashboard" || location.pathname === "/auth" || location.pathname === "/admin" || location.pathname === "/admin-login")
  
    return (
      <>
        {!hideNavbarFooter && <Navbar />}
        <div className="w-full min-h-screen">{children}</div>
        {!hideFooterOnly && <Footer/>}
        

      </>
    );
  };
  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        if (user) {
          signOut(auth)
            .then(() => console.log("User logged out due to inactivity"))
            .catch((error) => console.error("Logout error:", error));
        }
      }, AUTO_LOGOUT_TIME);
    };

    ["mousemove", "keypress", "click", "scroll"].forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      ["mousemove", "keypress", "click", "scroll"].forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [user]);
  

  return (
    <>
      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <Router >
          <ProgressBar />
          <Layout>
           <Routes>
  <Route path="/" element={<Home />} />  
  <Route path="/home" element={<Home />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route element={<PrivateRoute />}>
    <Route path="/layouts" element={<BrowseLayouts />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/modern" element={<ModernTemp />} />
    <Route path="/classic" element={<ClassicTemp />} />
    <Route path="/creative" element={<CreativeTemp />} />
  </Route>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

          </Layout>
        </Router>
      )}
    </>
  );
};
const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // Start progress bar
    setTimeout(() => NProgress.done(), 500); // Simulate delay for smooth transition

    return () => {
      NProgress.done(); // Ensure it stops when navigating
    };
  }, [location.pathname]);

  return null;
};

export default App;
