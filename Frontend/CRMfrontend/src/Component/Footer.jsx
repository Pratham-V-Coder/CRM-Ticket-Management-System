import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/clients", label: "Clients" },
  { to: "/sales", label: "Sales" },
  { to: "/reports", label: "Reports" },
  { to: "/settings", label: "Settings" },
  { to: "/contact", label: "Contact" },
  { to: "/help", label: "Help" },
];

const socials = [
  { to: "/facebook", label: "Facebook" },
  { to: "/twitter", label: "Twitter" },
  { to: "/linkedin", label: "LinkedIn" },
  { to: "/instagram", label: "Instagram" },
];

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <img
              className="h-9 w-9 sm:h-10 sm:w-10"
              src={logo}
              alt="CRM Logo"
            />
            <h2 className="text-lg sm:text-xl font-bold">MyCRM</h2>
          </div>
          <p className="text-gray-400 text-sm sm:max-w-md">
            Manage customers, sales, and reports in one place.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-6 pb-6 border-b border-gray-800">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-300 hover:text-blue-500 text-sm transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} MyCRM. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            {socials.map((social) => (
              <Link
                key={social.to}
                to={social.to}
                className="text-gray-400 hover:text-blue-500 text-xs sm:text-sm transition duration-300"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
