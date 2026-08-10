import React, { useEffect, useState } from "react";
import SecondDataTable from "./SecondDataTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTickets } from "./TicketsAction.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets.length, dispatch]);

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const closedTickets = tickets.filter((row) => row.status === "Closed");
  const totalTickets = tickets.length;

  return (
    <div className="p-4 sm:p-6 max-w-[1100px] mx-auto my-3 sm:my-5">
      {/* HEADER */}
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative w-full sm:w-[350px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-base text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by subject or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-9 pr-3 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none transition-shadow focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/20"
          />
        </div>

        {/* Add Ticket Button */}
        <button
          onClick={() => navigate("/addticket")}
          className="flex items-center justify-center gap-1.5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg px-4.5 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto whitespace-nowrap"
        >
          + Add New Ticket
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-3 mb-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
        {/* Total */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:px-5">
          <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-xl mb-2">
            🎫
          </div>
          <p className="text-xs text-gray-500 mb-1">Total Tickets</p>
          <p className="text-2xl sm:text-[28px] font-semibold text-gray-900 mb-1.5">
            {totalTickets}
          </p>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-medium">
            All time
          </span>
        </div>

        {/* Pending */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:px-5">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-xl mb-2">
            ⏳
          </div>
          <p className="text-xs text-gray-500 mb-1">Pending</p>
          <p className="text-2xl sm:text-[28px] font-semibold text-gray-900 mb-1.5">
            {pendingTickets.length}
          </p>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
            Open
          </span>
        </div>

        {/* Closed */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:px-5">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl mb-2">
            ✅
          </div>
          <p className="text-xs text-gray-500 mb-1">Closed</p>
          <p className="text-2xl sm:text-[28px] font-semibold text-gray-900 mb-1.5">
            {closedTickets.length}
          </p>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
            Resolved
          </span>
        </div>
      </div>

      {/* ALL TICKETS TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:px-5">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-4">
          All Tickets
        </h3>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <SecondDataTable searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
