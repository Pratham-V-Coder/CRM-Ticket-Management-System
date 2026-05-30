import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SecondDataTable({ searchQuery }) {
  const navigate = useNavigate();

  const {
    tickets = [],
    isLoading,
    error,
  } = useSelector((state) => state.tickets || {});

  const filteredData = tickets.filter(
    (item) =>
      item.subject?.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      item.status?.toLowerCase().includes((searchQuery || "").toLowerCase()),
  );

  if (isLoading) {
    return <div className="text-center mt-10 text-cyan-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="">
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-400">
        <table className="min-w-full">
          <thead>
            <tr className="bg-cyan-500 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Opened Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item._id || index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button
                      onClick={() => navigate(`/ticketpage/${item._id}`)}
                      className="text-cyan-600 hover:text-cyan-800 hover:underline cursor-pointer font-medium text-left"
                    >
                      {item.subject}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Closed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  {/* ✅ Date alag */}
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.openAt
                      ? new Date(item.openAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  {/* ✅ Time alag */}
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.openAt
                      ? new Date(item.openAt)
                          .toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .toUpperCase() // ✅ .toUpperCase() add kiya
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 text-sm"
                >
                  No Tickets Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecondDataTable;
