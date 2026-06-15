import React from "react";
import { PageBreadcrumb } from "../Component/Breadcrumb";
import IssueCategoryCards from "../Component/IssueCategoryCards";

const RaiseTicket = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5">
          <PageBreadcrumb page="Raise a Ticket" />
        </div>

        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            What do you need help with?
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Select the category that best matches your issue.
          </p>
        </div>

        <IssueCategoryCards />
      </div>
    </div>
  );
};

export default RaiseTicket;
