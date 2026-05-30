import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ useSelector add kiya
import { useNavigate } from "react-router-dom";
import { PageBreadcrumb } from "../Component/Breadcrumb";
import { AddTicketForm } from "../Component/AddTicketForm";
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
  const { user } = useSelector((state) => state.user); // ✅ user Redux se lo

  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataError, setFrmDataError] = useState(initialFrmError);

  useEffect(() => {
    return () => {
      dispatch(restSuccessMsg());
    };
  }, []);

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

    // ✅ sender add kiya
    const ticketData = {
      ...frmData,
      sender: user?.name || "User",
    };

    const success = await dispatch(openNewTicket(ticketData));

    if (success) {
      setFrmData(initialFrmDt);
      setFrmDataError(initialFrmError);
      navigate("/dashboard"); // ✅ dashboard pe redirect
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-5">
        <PageBreadcrumb page="New Ticket" />
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
        <AddTicketForm
          handleOnChange={handleOnChange}
          frmData={frmData}
          frmDataError={frmDataError}
          handleOnSubmit={handleOnSubmit}
        />
      </div>
    </div>
  );
};

export default AddTicket;
