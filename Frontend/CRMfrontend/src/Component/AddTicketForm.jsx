import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export const AddTicketForm = ({
  handleOnChange,
  frmData,
  frmDataError,
  handleOnSubmit,
}) => {
  const { isLoading, error, succesMsg } = useSelector(
    (state) => state.openTicket,
  );

  return (
    <div className="min-h-50 flex items-center justify-center bg-black px-4">
      <form
        autoComplete="off"
        onSubmit={handleOnSubmit} // ✅ parent ka handleOnSubmit use karo
        className="bg-white p-6 rounded-lg w-2xl max-w-md m-3"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add New Ticket</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {succesMsg && <Alert variant="primary">{succesMsg}</Alert>}
        {isLoading && <Spinner variant="primary" animation="border" />}

        {/* Subject */}
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            value={frmData.subject}
            onChange={handleOnChange} // ✅ parent ka handleOnChange
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          {frmDataError.subject && (
            <p className="text-red-500 text-xs mt-1">
              Subject kam se kam 3 characters ka hona chahiye
            </p>
          )}
        </div>

        {/* Issue Date */}
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Issue Date
          </label>
          <input
            type="date"
            name="issueDate"
            value={frmData.issueDate}
            onChange={handleOnChange} // ✅ parent ka handleOnChange
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Issue Message
          </label>
          <textarea
            name="message"
            rows="3"
            placeholder="Describe your issue..."
            value={frmData.message}
            onChange={handleOnChange} // ✅ parent ka handleOnChange
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          ></textarea>
          {frmDataError.message && (
            <p className="text-red-500 text-xs mt-1">
              Message kam se kam 3 characters ka hona chahiye
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold transition duration-300"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
