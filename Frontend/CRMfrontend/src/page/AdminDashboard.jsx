import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllTicketsAdmin,
  replyTicketAdmin,
  closeTicketAdmin,
  deleteTicketAdmin,
  fetchSingleTicketAdmin,
} from "../api/ticketApi";
import ManageEmployees from "./ManageEmployee";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, isAuth } = useSelector((state) => state.admin);

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [replyMsg, setReplyMsg] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const result = await fetchAllTicketsAdmin();
      if (result.status === "success") {
        setTickets(result.result || []);
      }
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTicket = async (ticketId) => {
    setReplyMsg("");
    setReply("");
    try {
      const result = await fetchSingleTicketAdmin(ticketId);
      if (result.status === "success") {
        setSelectedTicket(result.result[0] || result.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    try {
      const result = await replyTicketAdmin(selectedTicket._id, {
        sender: admin?.name || "Admin",
        message: reply,
      });
      if (result.status === "success") {
        setReply("");
        setReplyMsg("Reply sent!");
        handleSelectTicket(selectedTicket._id);
        loadTickets();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async (_id) => {
    try {
      const result = await closeTicketAdmin(_id);
      if (result.status === "success") {
        setReplyMsg("Ticket closed!");
        handleSelectTicket(_id);
        loadTickets();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      const result = await deleteTicketAdmin(_id);
      if (result.status === "success") {
        setSelectedTicket(null);
        loadTickets();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchSearch =
      t.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.status?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter =
      activeFilter === "All" ? true : t.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const totalTickets = tickets.length;
  const closedTickets = tickets.filter((t) => t.status === "Closed").length;
  const pendingTickets = tickets.filter((t) => t.status !== "Closed").length;

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>
        <div
          style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* STAT CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "12px",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>🎫</div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: "0 0 4px",
                }}
              >
                Total Tickets
              </p>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#111827",
                }}
              >
                {totalTickets}
              </p>
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>⏳</div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: "0 0 4px",
                }}
              >
                Pending
              </p>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#f59e0b",
                }}
              >
                {pendingTickets}
              </p>
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>✅</div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: "0 0 4px",
                }}
              >
                Closed
              </p>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  margin: 0,
                  color: "#10b981",
                }}
              >
                {closedTickets}
              </p>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: selectedTicket ? "1fr 1.5fr" : "1fr",
              gap: "16px",
            }}
          >
            {/* TICKET LIST */}
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              {/* Search */}
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                >
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #0e7490";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(14,116,144,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid #e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                  style={{
                    width: "100%",
                    padding: "9px 12px 9px 32px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Filter Tabs */}
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "12px" }}
              >
                {["All", "Open", "Closed", "Pending Operator response"].map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: "1px solid #e5e7eb",
                        background: activeFilter === f ? "#0e7490" : "white",
                        color: activeFilter === f ? "white" : "#6b7280",
                      }}
                    >
                      {f === "Pending Operator response" ? "Pending" : f}
                    </button>
                  ),
                )}
              </div>

              {/* Tickets */}
              {isLoading ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#9ca3af",
                    padding: "2rem",
                  }}
                >
                  Loading...
                </p>
              ) : filteredTickets.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#9ca3af",
                    padding: "2rem",
                  }}
                >
                  No tickets found
                </p>
              ) : (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    onClick={() => handleSelectTicket(ticket._id)}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      border:
                        selectedTicket?._id === ticket._id
                          ? "1.5px solid #0e7490"
                          : "1px solid #e5e7eb",
                      background:
                        selectedTicket?._id === ticket._id
                          ? "#f0fdff"
                          : "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 500,
                          fontSize: "13px",
                          color: "#111827",
                        }}
                      >
                        {ticket.subject}
                      </p>
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontWeight: 500,
                          background:
                            ticket.status === "Closed" ? "#dcfce7" : "#fef3c7",
                          color:
                            ticket.status === "Closed" ? "#15803d" : "#b45309",
                        }}
                      >
                        {ticket.status === "Closed" ? "Closed" : "Pending"}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: "11px",
                        color: "#0e7490",
                        fontWeight: 500,
                      }}
                    >
                      👤 {ticket.clientId?.name || "Unknown User"}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "11px",
                        color: "#9ca3af",
                      }}
                    >
                      {ticket.openAt
                        ? new Date(ticket.openAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* TICKET DETAIL */}
            {selectedTicket && (
              <div
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: "0 0 4px",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {selectedTicket.subject}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        margin: "4px 0",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          background: "#e0f2fe",
                          color: "#0369a1",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontWeight: 500,
                        }}
                      >
                        👤 {selectedTicket.clientId?.name || "Unknown"}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {selectedTicket.clientId?.email || ""}
                      </span>
                    </div>
                    <p
                      style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}
                    >
                      {selectedTicket.openAt
                        ? new Date(selectedTicket.openAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 10px",
                        borderRadius: "20px",
                        fontWeight: 500,
                        marginTop: "6px",
                        display: "inline-block",
                        background:
                          selectedTicket.status === "Closed"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          selectedTicket.status === "Closed"
                            ? "#15803d"
                            : "#b45309",
                      }}
                    >
                      {selectedTicket.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleClose(selectedTicket._id)}
                      disabled={selectedTicket.status === "Closed"}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: "1.5px solid #ef4444",
                        background: "white",
                        color: "#ef4444",
                        opacity: selectedTicket.status === "Closed" ? 0.5 : 1,
                      }}
                    >
                      Close Ticket
                    </button>
                    <button
                      onClick={() => handleDelete(selectedTicket._id)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: "1.5px solid #6b7280",
                        background: "white",
                        color: "#6b7280",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Conversation */}
                <div
                  style={{
                    maxHeight: "320px",
                    overflowY: "auto",
                    marginBottom: "1rem",
                    paddingRight: "4px",
                  }}
                >
                  {!selectedTicket.conversation ||
                  selectedTicket.conversation.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#9ca3af",
                        fontSize: "13px",
                        padding: "2rem",
                      }}
                    >
                      No messages yet
                    </p>
                  ) : (
                    selectedTicket.conversation.map((conv, index) => {
                      const isAdmin =
                        conv.sender?.toLowerCase() === "admin" ||
                        conv.sender?.toLowerCase() === "employee" ||
                        conv.sender?.toLowerCase() === "operator";
                      return (
                        <div key={index} style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: isAdmin
                                ? "flex-end"
                                : "flex-start",
                              marginBottom: "2px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                color: "#6b7280",
                              }}
                            >
                              {conv.sender}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: isAdmin
                                ? "flex-end"
                                : "flex-start",
                            }}
                          >
                            <div
                              style={{
                                padding: "10px 14px",
                                borderRadius: "12px",
                                maxWidth: "75%",
                                fontSize: "13px",
                                background: isAdmin ? "#0e7490" : "#f3f4f6",
                                color: isAdmin ? "white" : "#111827",
                              }}
                            >
                              {conv.message}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {replyMsg && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#10b981",
                      marginBottom: "8px",
                    }}
                  >
                    {replyMsg}
                  </p>
                )}

                {selectedTicket.status === "Closed" ? (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#ef4444",
                      fontSize: "13px",
                      fontWeight: 500,
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: "12px",
                    }}
                  >
                    Ticket is closed. No further replies allowed.
                  </p>
                ) : (
                  <form onSubmit={handleReply}>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows={3}
                      placeholder="Write your reply..."
                      style={{
                        width: "100%",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "10px",
                        fontSize: "13px",
                        outline: "none",
                        resize: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "8px",
                      }}
                    >
                      <button
                        type="submit"
                        style={{
                          background: "#0e7490",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 20px",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Send Reply
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Manage Employees Modal */}
      {showEmployeeModal && (
        <ManageEmployees onClose={() => setShowEmployeeModal(false)} />
      )}
    </>
  );
};

export default AdminDashboard;
