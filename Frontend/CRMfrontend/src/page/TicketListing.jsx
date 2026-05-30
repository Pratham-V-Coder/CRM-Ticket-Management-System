import React, { useState, useEffect } from "react";
import SecondDataTable from "./SecondDataTable";
import { useDispatch } from "react-redux";
import { fetchAllTickets, filterSearchTicket } from "./TicketsAction";
import { useNavigate } from "react-router-dom";

function TicketListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    dispatch(filterSearchTicket(value));
  };

  return (
    <div>
      <div className="flex justify-between mx-40 mt-5">
        {/* ✅ Navigate to AddTicket page */}
        <button
          onClick={() => navigate("/addticket")}
          className="bg-cyan-500 text-white rounded-xl px-3 py-1 text-2xl"
        >
          New Ticket
        </button>

        <div>
          <label htmlFor="Search">
            Search:
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="border-2 p-1 rounded-sm pl-2 ml-2"
            />
          </label>
        </div>
      </div>
      <SecondDataTable searchQuery={searchQuery} />
    </div>
  );
}

export default TicketListing;
