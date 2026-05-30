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
  const urgentTickets = tickets.filter(
    (row) => row.priority === "High" || row.priority === "Urgent",
  );
  const totalTickets = tickets.length;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left - Greeting */}
          <div>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
              Good morning 👋
            </p>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                margin: "2px 0 0",
                color: "#111827",
              }}
            >
              CRM Dashboard
            </h2>
          </div>

          {/* Center - Search Bar */}
          {/* Center - Search Bar */}
          <div style={{ position: "relative", width: "350px" }}>
            <span
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "#9ca3af",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by subject or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => {
                e.target.style.border = "1.5px solid #0e7490";
                e.target.style.boxShadow =
                  "0 4px 12px rgba(14, 116, 144, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              style={{
                width: "100%",
                padding: "10px 12px 10px 34px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "13px",
                outline: "none",
                color: "#111827",
                boxSizing: "border-box",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          {/* Right - Button */}
          <button
            onClick={() => navigate("/addticket")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#0e7490",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            + Add New Ticket
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "1.5rem",
        }}
      >
        {/* Total */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#e0f2fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            🎫
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px" }}>
            Total Tickets
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 6px",
              color: "#111827",
            }}
          >
            {totalTickets}
          </p>
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "20px",
              background: "#e0f2fe",
              color: "#0369a1",
              fontWeight: 500,
            }}
          >
            All time
          </span>
        </div>

        {/* Pending */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#fef3c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            ⏳
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px" }}>
            Pending
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 6px",
              color: "#111827",
            }}
          >
            {pendingTickets.length}
          </p>
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "20px",
              background: "#fef3c7",
              color: "#b45309",
              fontWeight: 500,
            }}
          >
            Open
          </span>
        </div>

        {/* Closed */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            ✅
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px" }}>
            Closed
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 6px",
              color: "#111827",
            }}
          >
            {closedTickets.length}
          </p>
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "20px",
              background: "#dcfce7",
              color: "#15803d",
              fontWeight: 500,
            }}
          >
            Resolved
          </span>
        </div>

        {/* Urgent */}
        <div
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "#fce7f3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            🚨
          </div>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px" }}>
            High Priority
          </p>
          <p
            style={{
              fontSize: "28px",
              fontWeight: 600,
              margin: "0 0 6px",
              color: "#111827",
            }}
          >
            {urgentTickets.length}
          </p>
          <span
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "20px",
              background: "#fce7f3",
              color: "#be185d",
              fontWeight: 500,
            }}
          >
            Urgent
          </span>
        </div>
      </div>

      {/* ALL TICKETS TABLE */}
      <div
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
        }}
      >
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            margin: "0 0 1rem",
            color: "#111827",
          }}
        >
          All Tickets
        </h3>
        <SecondDataTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Dashboard;
