import React, { useState, useEffect, useRef } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const OTHER_OPTION = "__other__";

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

  const relatedIssues = categoryInfo?.relatedIssues || [];
  const hasPresetIssues = relatedIssues.length > 0;

  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectMode, setSelectMode] = useState(() =>
    hasPresetIssues && relatedIssues.includes(frmData.subject)
      ? frmData.subject
      : hasPresetIssues && frmData.subject
        ? OTHER_OPTION
        : "",
  );
  const pickerRef = useRef(null);

  // category badalne pe reset
  useEffect(() => {
    setSelectMode(
      hasPresetIssues && relatedIssues.includes(frmData.subject)
        ? frmData.subject
        : "",
    );
    setPickerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryInfo?.value]);

  // bahar click/tap karne pe picker band ho jaye
  useEffect(() => {
    const handleOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const handlePick = (value) => {
    setSelectMode(value);
    if (value === OTHER_OPTION) {
      handleOnChange({ target: { name: "subject", value: "" } });
      setPickerOpen(false);
      setTimeout(() => {
        document.getElementById("subject-other-input")?.focus();
      }, 50);
    } else {
      handleOnChange({ target: { name: "subject", value } });
      setPickerOpen(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!frmData.issueDate) {
      handleOnChange({ target: { name: "issueDate", value: today } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleOnSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Ticket Details</h2>
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
        <Alert
          variant="danger"
          className="rounded-xl border-0 bg-red-50 text-sm text-red-700"
        >
          {error}
        </Alert>
      )}
      {succesMsg && (
        <Alert
          variant="primary"
          className="rounded-xl border-0 bg-cyan-50 text-sm text-cyan-700"
        >
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

        {hasPresetIssues ? (
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
                frmDataError.subject
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-300 focus:border-cyan-500"
              } ${pickerOpen ? "border-cyan-500 ring-2 ring-cyan-500/30" : ""}`}
            >
              <span
                className={
                  selectMode && selectMode !== OTHER_OPTION
                    ? "text-gray-900"
                    : selectMode === OTHER_OPTION
                      ? "text-gray-900"
                      : "text-gray-400"
                }
              >
                {selectMode === OTHER_OPTION
                  ? frmData.subject || "Type your own issue..."
                  : selectMode || "Select the related issue"}
              </span>
              <svg
                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                  pickerOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`absolute z-20 mt-2 w-full origin-top overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-slate-200/70 transition-all duration-200 ease-out ${
                pickerOpen
                  ? "max-h-80 scale-100 opacity-100"
                  : "pointer-events-none max-h-0 scale-95 opacity-0"
              }`}
            >
              <div className="max-h-80 overflow-y-auto py-1">
                {relatedIssues.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => handlePick(issue)}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm transition active:bg-cyan-100 sm:py-2.5 sm:hover:bg-cyan-50 ${
                      selectMode === issue
                        ? "bg-cyan-50 font-medium text-cyan-700"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{issue}</span>
                    {selectMode === issue && (
                      <svg
                        className="h-4 w-4 shrink-0 text-cyan-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
                <div className="my-1 border-t border-gray-100" />
                <button
                  type="button"
                  onClick={() => handlePick(OTHER_OPTION)}
                  className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition active:bg-cyan-100 sm:py-2.5 sm:hover:bg-cyan-50 ${
                    selectMode === OTHER_OPTION
                      ? "bg-cyan-50 font-medium text-cyan-700"
                      : "text-gray-500"
                  }`}
                >
                  ✏️ Other (specify your own)
                </button>
              </div>
            </div>

            <div
              className={`grid transition-all duration-200 ease-out ${
                selectMode === OTHER_OPTION
                  ? "mt-2 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <input
                  id="subject-other-input"
                  type="text"
                  name="subject"
                  placeholder="Apna issue likho"
                  value={frmData.subject}
                  onChange={handleOnChange}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
                    frmDataError.subject
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-300 focus:border-cyan-500"
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
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
          />
        )}

        {frmDataError.subject && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            Subject select ya likhna zaroori hai
          </p>
        )}
      </div>

      {/* Issue Date */}
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
          min={new Date().toISOString().split("T")[0]}
          max={new Date().toISOString().split("T")[0]}
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
