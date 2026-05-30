import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../page/userSlice";
import { logout } from "../page/LoginSlice";
import { adminLogoutThunk } from "../page/adminAction";
import { userLogout } from "../api/userApi";
import ManageEmployees from "../page/ManageEmployee";

function Navbar() {
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    navigate("/login");
  };

  const isAdmin = adminAuth;
  const displayName = isAdmin ? admin?.name : user?.name;

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-white font-bold text-lg">🛠️ CRM</div>

          <div className="flex items-center space-x-4">
            {displayName && (
              <span className="text-gray-300 text-sm">
                {isAdmin ? "👑" : "👤"} {displayName}
              </span>
            )}

            {isAdmin && (
              <button
                onClick={() => setShowEmployeeModal(true)}
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white font-semibold text-sm"
              >
                👥 Manage Employees
              </button>
            )}

            <button
              onClick={logMeOut}
              disabled={isLoggingOut}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white font-semibold text-sm disabled:opacity-70 flex items-center gap-1"
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
          </div>
        </div>
      </div>

      {showEmployeeModal && (
        <ManageEmployees onClose={() => setShowEmployeeModal(false)} />
      )}
    </nav>
  );
}

export default Navbar;
