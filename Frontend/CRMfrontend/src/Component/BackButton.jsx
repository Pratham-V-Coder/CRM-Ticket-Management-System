import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", fallback = "/" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // agar browser history mein pichla page hai toh wahi jao
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // agar direct link se aaya hai (no history), toh fallback route pe bhejo
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-1.5 px-3.5 py-1.5 mb-3 rounded-lg text-[13px] font-medium cursor-pointer border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
    >
      ← {label}
    </button>
  );
};

export default BackButton;
