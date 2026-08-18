import React from "react";
import { PageBreadcrumb } from "../Component/Breadcrumb";
import IssueCategoryCards from "../Component/IssueCategoryCards";

const RaiseTicket = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* <div className="mb-6">
          <PageBreadcrumb page="Raise a Ticket" />
        </div> */}

        {/* Header */}
        <div className="mb-10 relative">
          <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-violet-500 to-violet-300 hidden sm:block" />
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-500 uppercase mb-2">
            Support Center
          </p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl font-['Poppins'] tracking-tight">
            What do you need help with?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
            Select the category that best matches your issue, and we'll route it
            to the right team.
          </p>
        </div>

        {/* Category cards container */}
        <div className="rounded-3xl border border-slate-200/70 bg-white/60 backdrop-blur-sm p-5 sm:p-8 shadow-[0_20px_60px_-30px_rgba(76,29,149,0.25)]">
          <IssueCategoryCards />
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Can't find the right category?{" "}
          <span className="text-violet-500 font-medium cursor-pointer hover:text-violet-600 transition-colors">
            Contact support directly
          </span>
        </p>
      </div>
    </div>
  );
};

export default RaiseTicket;
