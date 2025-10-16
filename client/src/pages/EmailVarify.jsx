import React, { useRef, useState, useContext } from "react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVarify = () => {
  const navigate = useNavigate();
  const { backendUrl, getUserdata } = useContext(AppContext);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Focus management & OTP handling
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("Text").replace(/\D/g, "");
    if (!paste) return;
    const newOtp = [...otp];
    paste.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpCode = otp.join("");
      if (otpCode.length < 6) {
        toast.error("Please enter all 6 digits of the OTP");
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: otpCode });

      if (data.success) {
        toast.success(data.message);
        getUserdata();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center space-y-6">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-16 h-16 mx-auto mb-4 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        />

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800">Email Verification</h1>
        <p className="text-gray-600">Enter the 6-digit code sent to your email id.</p>

        {/* OTP Input Boxes */}
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-md"
          >
            Verify OTP
          </button>

          {/* <p className="text-gray-500 text-sm">
            Didn’t get the code?{" "}
            <span className="text-indigo-500 font-medium cursor-pointer hover:underline">
              Resend
            </span>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default EmailVarify;
