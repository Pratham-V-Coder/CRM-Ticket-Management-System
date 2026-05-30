import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replayOnTicket } from "./TicketsAction";
import PropTypes from "prop-types";

const UpdateTicket = ({ _id }) => {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const msgObj = {
      message,
      sender: name,
    };
    dispatch(replayOnTicket(_id, msgObj));
    console.log(msgObj);
    setMessage("");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="w-full">
        <label className="block text-lg font-semibold mb-2">Reply</label>
        <p className="text-gray-600 mb-3">
          Please reply your message here or update the ticket
        </p>
        <textarea
          value={message}
          onChange={handleOnChange}
          rows={5}
          name="detail"
          placeholder="Enter your reply..."
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <div className="text-right mt-3 mb-3">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg transition"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired, // ✅ fixed: propTypes → PropTypes
};

export default UpdateTicket; // ✅ added missing default export
