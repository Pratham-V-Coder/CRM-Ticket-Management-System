import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../page/userSlice";
import { logout } from "../page/LoginSlice";
import { adminLogoutThunk } from "../page/adminAction";
import { userLogout } from "../api/userApi";

function Navbar() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { isAuth: adminAuth, admin } = useSelector((state) => state.admin);

  const logMeOut = async () => {
    setIsLoggingOut(true);
    if (adminAuth) {
      await dispatch(adminLogoutThunk());
    } else {
      await userLogout();
      dispatch(logoutUser());
      dispatch(logout());
    }
    setIsLoggingOut(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const isAdmin = adminAuth;
  const displayName = isAdmin ? admin?.name : user?.name;

  const LogoutButton = ({ full }) => (
    <button
      onClick={logMeOut}
      disabled={isLoggingOut}
      className={`bg-red-500 hover:bg-red-600 px-3 py-1.5 sm:py-1 rounded text-white font-semibold text-sm disabled:opacity-70 flex items-center justify-center gap-1 ${
        full ? "w-full" : ""
      }`}
    >
      {isLoggingOut ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </button>
  );

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-white font-bold text-lg">CRM</div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAdmin && (
              <Link
                to="/raise-ticket"
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white font-semibold text-sm"
              >
                Raise Ticket
              </Link>
            )}

            {displayName && (
              <span className="text-gray-300 text-sm truncate max-w-[160px]">
                {isAdmin ? "👑" : "👤"} {displayName}
              </span>
            )}

            <LogoutButton />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 -mr-2 text-gray-200 hover:text-white"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-800 pt-3">
            {displayName && (
              <div className="text-gray-300 text-sm px-1 pb-1">
                {isAdmin ? "👑" : "👤"} {displayName}
              </div>
            )}

            {!isAdmin && (
              <Link
                to="/raise-ticket"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded text-white font-semibold text-sm"
              >
                + Raise Ticket
              </Link>
            )}

            <LogoutButton full />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
