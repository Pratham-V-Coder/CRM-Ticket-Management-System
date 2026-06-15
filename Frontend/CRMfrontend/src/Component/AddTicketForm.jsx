import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export const AddTicketForm = ({
  handleOnChange,
  frmData,
  frmDataError,
  handleOnSubmit,
  categoryInfo,
}) => {
  const { isLoading, error, succesMsg } = useSelector(
    (state) => state.openTicket,
  );

  return (
    <form autoComplete="off" onSubmit={handleOnSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Ticket Details
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide as much detail as possible so our team can help quickly.
        </p>
      </div>

      {categoryInfo && (
        <div className="flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700">
          <span className="text-base">{categoryInfo.icon}</span>
          Category: {categoryInfo.label}
        </div>
      )}

      {error && (
        <Alert variant="danger" className="rounded-xl border-0 bg-red-50 text-sm text-red-700">
          {error}
        </Alert>
      )}
      {succesMsg && (
        <Alert variant="primary" className="rounded-xl border-0 bg-cyan-50 text-sm text-cyan-700">
          {succesMsg}
        </Alert>
      )}
      {isLoading && (
        <div className="flex justify-center py-2">
          <Spinner variant="primary" animation="border" size="sm" />
        </div>
      )}

      {/* Subject */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Subject <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Briefly describe the issue"
          value={frmData.subject}
          onChange={handleOnChange}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
            frmDataError.subject
              ? "border-red-300 focus:border-red-400"
              : "border-gray-300 focus:border-cyan-500"
          }`}
          required
        />
        {frmDataError.subject && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            Subject kam se kam 3 characters ka hona chahiye
          </p>
        )}
      </div>

      {/* Issue Date */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Issue Date <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          name="issueDate"
          value={frmData.issueDate}
          onChange={handleOnChange}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
            frmDataError.issueDate
              ? "border-red-300 focus:border-red-400"
              : "border-gray-300 focus:border-cyan-500"
          }`}
          required
        />
        {frmDataError.issueDate && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            Issue date select karna zaroori hai
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Issue Message <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          rows="5"
          placeholder="Describe your issue in detail..."
          value={frmData.message}
          onChange={handleOnChange}
          className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
            frmDataError.message
              ? "border-red-300 focus:border-red-400"
              : "border-gray-300 focus:border-cyan-500"
          }`}
          required
        ></textarea>
        {frmDataError.message && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            Message kam se kam 3 characters ka hona chahiye
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-600/20 transition hover:from-cyan-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Submitting..." : "Submit Ticket"}
      </button>
    </form>
  );
};

export default AddTicketForm;