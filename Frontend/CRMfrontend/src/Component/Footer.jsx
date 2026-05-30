import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img className="h-12 w-12" src={logo} alt="CRM Logo" />

              <h2 className="text-2xl font-bold">MyCRM</h2>
            </div>

            <p className="text-gray-400 leading-7">
              Manage your customers, sales, reports, and business workflow
              efficiently with our modern CRM solution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xl font-semibold mb-5 text-yellow-400"
              style={{ textDecoration: "none" }}
            >
              Quick Links
            </h3>

            <div
              className="flex flex-col gap-3"
              style={{ textDecoration: "none" }}
            >
              <Link
                to="/"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </Link>

              <Link
                to="/clients"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Clients
              </Link>

              <Link
                to="/sales"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Sales
              </Link>

              <Link
                to="/reports"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Reports
              </Link>

              <Link
                to="/settings"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Settings
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-yellow-400">
              Support
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/privacy"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Terms & Conditions
              </Link>

              <Link
                to="/contact"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Contact Us
              </Link>

              <Link
                to="/help"
                className="text-white hover:text-blue-500 hover:underline transition duration-300"
                style={{ textDecoration: "none" }}
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} MyCRM. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <Link
              to="/facebook"
              className="text-white hover:text-blue-500 hover:underline transition duration-300"
              style={{ textDecoration: "none" }}
            >
              Facebook
            </Link>

            <Link
              to="/twitter"
              className="text-white hover:text-blue-500 hover:underline transition duration-300"
              style={{ textDecoration: "none" }}
            >
              Twitter
            </Link>

            <Link
              to="/linkedin"
              className="text-white hover:text-blue-500 hover:underline transition duration-300"
              style={{ textDecoration: "none" }}
            >
              LinkedIn
            </Link>

            <Link
              to="/instagram"
              className="text-white hover:text-blue-500 hover:underline transition duration-300"
              style={{ textDecoration: "none" }}
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
