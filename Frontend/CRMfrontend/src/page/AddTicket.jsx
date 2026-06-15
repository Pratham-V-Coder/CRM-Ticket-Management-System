import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PageBreadcrumb } from "../Component/Breadcrumb";
import { AddTicketForm } from "../Component/AddTicketForm";
import { TICKET_CATEGORIES } from "../Component/IssueCategoryCards";
import { openNewTicket } from "./addTicketAction";
import { restSuccessMsg } from "./addTicketSlicer";

const initialFrmDt = {
  subject: "",
  issueDate: "",
  message: "",
};

const initialFrmError = {
  subject: false,
  issueDate: false,
  message: false,
};

const AddTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const { user } = useSelector((state) => state.user);

  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataError, setFrmDataError] = useState(initialFrmError);

  // Redirect to category selection if no category in URL
  useEffect(() => {
    if (!category) {
      navigate("/raise-ticket", { replace: true });
    }
  }, [category, navigate]);

  useEffect(() => {
    return () => {
      dispatch(restSuccessMsg());
    };
  }, []);

  const categoryInfo =
    TICKET_CATEGORIES.find((c) => c.value === category) ||
    TICKET_CATEGORIES.find((c) => c.value === "other");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFrmData({
      ...frmData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {
      subject: frmData.subject.trim() === "",
      issueDate: frmData.issueDate.trim() === "",
      message: frmData.message.trim() === "",
    };
    setFrmDataError(errors);
    return !Object.values(errors).includes(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const ticketData = {
      ...frmData,
      sender: user?.name || "User",
      category: categoryInfo.value,
    };

    const success = await dispatch(openNewTicket(ticketData));

    if (success) {
      setFrmData(initialFrmDt);
      setFrmDataError(initialFrmError);
      navigate("/dashboard");
    }
  };

  if (!category) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <PageBreadcrumb page="New Ticket" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Raise a New Ticket
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Apna issue describe karo, hamari support team jald se jald reply
            karegi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Form card */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-slate-200/60">
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600" />
            <div className="p-6 sm:p-8">
              <AddTicketForm
                handleOnChange={handleOnChange}
                frmData={frmData}
                frmDataError={frmDataError}
                handleOnSubmit={handleOnSubmit}
                categoryInfo={categoryInfo}
              />
            </div>
          </div>

          {/* Side info panel */}
          <div className="space-y-4">
            {/* Selected category */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-slate-200/60">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Selected Category
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-2xl">
                  {categoryInfo.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {categoryInfo.label}
                  </p>
                  <p className="text-xs text-gray-400">{categoryInfo.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/raise-ticket")}
                className="mt-3 text-xs font-medium text-cyan-600 hover:underline"
              >
                Change category
              </button>
            </div>

            {/* Submitting as */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-slate-200/60">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Submitting As
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-base font-semibold text-white">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email || "—"}</p>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="px-1 text-center text-xs text-gray-400">
              Fields marked{" "}
              <span className="font-semibold text-red-400">*</span> are
              required. You'll be redirected to your dashboard after submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
