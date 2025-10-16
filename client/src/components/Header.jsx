import React, { useContext } from "react";
import header_img from "../assets/header_img.png";
import hand_wave from "../assets/hand_wave.png";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100vh] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bg-indigo-200 w-40 h-40 rounded-full -top-16 -left-16 animate-pulse opacity-30"></div>
        <div className="absolute bg-purple-300 w-32 h-32 rounded-full -bottom-10 right-20 animate-bounce opacity-20"></div>
        <div className="absolute bg-green-200 w-24 h-24 rounded-full top-1/3 right-10 animate-spin-slow opacity-15"></div>
      </div>

      {/* Left Content */}
      <div className="relative flex flex-col items-start text-left space-y-6 md:w-1/2 mt-8 md:mt-0 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center gap-3">
          Hey {userData ? userData.name : "Developer"}!
          <img
            src={hand_wave}
            alt="hand wave"
            className="w-10 h-10 animate-wiggle"
          />
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700">
          Welcome to our app 👋
        </h2>

        <p className="text-gray-600 leading-relaxed max-w-md">
          Let's start with a quick product tour — we’ll have you up and running
          in no time! Discover how you can manage your projects, track progress,
          and collaborate effortlessly.
        </p>

        {/* Features / Highlights */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
            🚀 Fast & Efficient
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
            🔒 Secure & Reliable
          </span>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm shadow-sm">
            💡 Easy to Use
          </span>
        </div>

        {/* Mini Stats */}
        <div className="flex gap-6 mt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-600">1.2K+</h3>
            <p className="text-gray-500 text-sm">Active Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-600">3.4K+</h3>
            <p className="text-gray-500 text-sm">Tasks Completed</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">245</h3>
            <p className="text-gray-500 text-sm">Projects Live</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/demo")}
            className="px-6 py-3 border border-indigo-500 text-indigo-500 rounded-full hover:bg-indigo-50 transition-colors duration-300"
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center relative z-10">
        <img
          src={header_img}
          alt="header illustration"
          className="w-full max-w-md drop-shadow-lg animate-float"
        />
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Header;
