import React, { useState, useRef, useContext } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl, getUserdata } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputsRef = useRef([]);

  // Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "");
    if (!pasteData) return;

    const newOtp = [...otp];
    pasteData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
  };

  // Step 1: Send reset OTP
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setStep(2);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Step 2: Verify OTP
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }
    toast.success("OTP entered successfully!");
    setStep(3); // go to new password step
  };

  // Step 3: Reset Password (no OTP here)
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          otp: otp.join(""),
          newPassword,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserdata();
        navigate("/login");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Step 1: Email */}
        {step === 1 && (
          <form
            onSubmit={onSubmitEmail}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 mx-auto mb-4 rounded-full shadow-sm cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
            <p className="text-gray-600">Enter your registered email address</p>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-md"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form
            onSubmit={onSubmitOTP}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800">Verify OTP</h1>
            <p className="text-gray-600">
              Enter the 6-digit code sent to your email.
            </p>

            <div className="flex justify-between gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-md"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form
            onSubmit={onSubmitNewPassword}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Password
            </h1>
            <p className="text-gray-600">Enter your new password below</p>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-md"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
