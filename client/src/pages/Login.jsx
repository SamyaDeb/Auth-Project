import React, { useContext, useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserdata} = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault(); //prevent the page from relode

      axios.defaults.withCredentials = true; //for sending cookie

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserdata()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          getUserdata()
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md relative">
        {/* Back to Home Logo */}
        <div
          onClick={() => navigate("/")}
          className="absolute -top-12 left-0 flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-white p-2 rounded-full shadow-md group-hover:shadow-lg transition">
            <ArrowLeft className="w-5 h-5 text-indigo-600 group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <img
            src={logo}
            alt="App Logo"
            className="w-8 h-8 rounded-full shadow-sm"
          />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {state === "Sign Up"
            ? "Create your account to get started"
            : "Login to your account!"}
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email id"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <div
              className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-indigo-500 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </div>
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="text-sm text-right text-indigo-600 hover:underline cursor-pointer"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition duration-300 shadow-md"
          >
            {state}
          </button>
        </form>

        {/* Switch between login/signup */}
        <p className="text-center text-gray-600 mt-6">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
