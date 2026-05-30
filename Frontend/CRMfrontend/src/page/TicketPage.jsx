import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleTicket,
  closeTicket,
  replayOnTicket,
} from "./TicketsAction.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Alert } from "react-bootstrap";
import { resetResponseMsg } from "./ticketSlice.js";

function TicketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, selectedTicket, replyTicketError, replyMsg } =
    useSelector((state) => state.tickets);

  const { user } = useSelector((state) => state.user);

  const [reply, setReply] = useState("");

  // ✅ Role check
  const isEmployee = user?.role === "employee" || user?.role === "admin";
  const isUser = user?.role === "user";

  useEffect(() => {
    dispatch(fetchSingleTicket(id));
    return () => {
      (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
    };
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner variant="primary" animation="border" />
      </div>
    );
  }

  if (!isLoading && !selectedTicket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Ticket Not Found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    // ✅ sender naam se store hoga
    const msgObj = {
      sender: user?.name || (isEmployee ? "Employee" : "User"),
      message: reply,
    };

    dispatch(replayOnTicket(id, msgObj)); // ✅ Database mein store hoga
    setReply("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {error && <Alert variant="danger">{error}</Alert>}
      {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
      {replyTicketError && <Alert variant="danger">{replyTicketError}</Alert>}

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <span
            onClick={() => navigate("/dashboard")}
            className="text-cyan-500 cursor-pointer hover:underline"
          >
            Home
          </span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-500">Ticket</span>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-semibold text-gray-700">
                Subject: {selectedTicket?.subject}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold text-gray-700">
                Ticket Opened:{" "}
                {selectedTicket?.openAt &&
                  new Date(selectedTicket.openAt).toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold text-gray-700">Status: </span>
              <span
                className={`font-semibold ${
                  selectedTicket?.status === "Closed"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {selectedTicket?.status}
              </span>
            </p>
          </div>

          {/* ✅ Sirf Employee/Admin Close kar sakta hai */}
          {isEmployee && (
            <button
              onClick={() => dispatch(closeTicket(id))}
              className="border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-5 py-2 rounded-lg text-sm font-semibold transition duration-300 disabled:opacity-50"
              disabled={selectedTicket?.status === "Closed"}
            >
              Close Ticket
            </button>
          )}
        </div>

        {/* Conversation Messages */}
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
          {!selectedTicket?.conversation ||
          selectedTicket.conversation.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">
              No messages yet.
            </p>
          ) : (
            selectedTicket.conversation.map((conv, index) => {
              // ✅ employee/operator/admin → RIGHT, user → LEFT
              const isEmployeeMsg =
                conv.sender?.toLowerCase() === "employee" ||
                conv.sender?.toLowerCase() === "operator" ||
                conv.sender?.toLowerCase() === "admin";

              return (
                <div key={index} className="mb-4">
                  {/* Sender Name */}
                  <div
                    className={`flex ${isEmployeeMsg ? "justify-end" : "justify-start"} mb-1`}
                  >
                    <span className="text-xs font-semibold text-gray-500 capitalize">
                      {conv.sender}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`flex ${isEmployeeMsg ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-2xl px-5 py-3 max-w-sm border shadow-sm ${
                        isEmployeeMsg
                          ? "bg-cyan-500 text-white border-cyan-500" // ✅ Employee RIGHT cyan
                          : "bg-white text-gray-700 border-gray-200" // ✅ User LEFT white
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {conv.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Reply Section */}
        {selectedTicket?.status === "Closed" ? (
          // ✅ Ticket band ho toh message dikha
          <div className="text-center py-4 text-red-400 text-sm border-t font-semibold">
            This ticket is closed. No further replies allowed.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700 font-semibold mb-2">
              {isEmployee ? "Reply to User" : "Continue Conversation"}{" "}
              {/* ✅ Role se label */}
            </label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder={
                isEmployee
                  ? "Write your reply here..."
                  : "Write your follow up message here..."
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none mb-4"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2 rounded-lg text-sm font-semibold transition duration-300"
              >
                {isEmployee ? "Submit Reply" : "Send Message"}{" "}
                {/* ✅ Role se button text */}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TicketPage;
