import React from "react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        {/* About Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">AUTH</h2>
          <p className="text-gray-100">
            A modern authentication system built with React, Node, and MongoDB. 
            Manage users securely and effortlessly.
          </p>
        </div>

        {/* Links Section */}
        <div className="md:w-1/3 flex flex-col gap-2">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <a href="/" className="hover:underline">Home</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
          <a href="/about" className="hover:underline">About</a>
        </div>

        {/* Contact / Social Section */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-2">Contact & Follow</h3>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-white" />
            <span>contact@authapp.com</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-white/30 pt-6 text-center text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} AUTH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
