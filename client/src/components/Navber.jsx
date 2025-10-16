import React, { useContext } from "react";
import { ArrowRight, LogOut, Mail } from "lucide-react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);
      setIsLoggedin(false);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  // Email verify handler
  const handleVerify = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-transparent absolute w-full top-0 z-50">
      {/* Logo Section */}
      <div
        className="flex items-center space-x-3 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-xl font-semibold text-Black">AUTH</h1>
      </div>

      {/* Right Section */}
      {userData ? (
        <div className="relative group">
          {/* User Circle */}
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
            {userData.name[0].toUpperCase()}
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50 py-1">
            {!userData.isAccountVerified && (
              <button
                onClick={handleVerify}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-indigo-500" />
                Email Verify
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Log Out
            </button>
          </div>
        </div>
      ) : (
        // Login Button
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-md"
          onClick={() => navigate("/login")}
        >
          Login
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
