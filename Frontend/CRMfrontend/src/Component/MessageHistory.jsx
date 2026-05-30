import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

export const MessageHistory = ({ msg }) => {
  if (!msg) {
    return null;
  }

  const { replyMsg } = useSelector((state) => state.tickets);

  return msg.map((row, i) => (
    <div key={i} className="message-history mt-3">
      <div className="send font-weight-bold text-secondary">
        {/* ✅ Schema mein sender tha */}
        <div className="sender">{row.sender}</div>
        {/* ✅ Schema mein msgAt tha */}
        <div className="date">{new Date(row.msgAt).toLocaleDateString()}</div>
      </div>
      <div className="message">{row.message}</div>
    </div>
  ));
};

// ✅ propTypes sahi spelling
MessageHistory.propTypes = {
  msg: PropTypes.array.isRequired,
};
