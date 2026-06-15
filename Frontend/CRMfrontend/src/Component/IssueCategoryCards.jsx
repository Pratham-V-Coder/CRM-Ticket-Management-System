import React from "react";
import { useNavigate } from "react-router-dom";

export const TICKET_CATEGORIES = [
  {
    value: "hardware",
    label: "Hardware Issue",
    desc: "Laptop, desktop, monitor, peripherals",
    icon: "🖥️",
  },
  {
    value: "software",
    label: "Software Issue",
    desc: "OS, app crashes, installation, licensing",
    icon: "💾",
  },
  {
    value: "network",
    label: "Network Issue",
    desc: "Wifi, LAN, VPN, internet connectivity",
    icon: "📡",
  },
  {
    value: "application",
    label: "Application/Access Issue",
    desc: "Login problems, access requests, CRM/ERP",
    icon: "🔐",
  },
  {
    value: "account_hr",
    label: "Account/HR Issue",
    desc: "Payroll, leave portal, ID card, attendance",
    icon: "🧾",
  },
  {
    value: "email",
    label: "Email Issue",
    desc: "Email not working, spam, configuration",
    icon: "📧",
  },
  {
    value: "asset_request",
    label: "Asset Request",
    desc: "New laptop, monitor, accessories",
    icon: "📦",
  },
  {
    value: "security",
    label: "Security Issue",
    desc: "Virus, suspicious activity, password reset",
    icon: "🛡️",
  },
  {
    value: "printer_scanner",
    label: "Printer/Scanner Issue",
    desc: "Printer or scanner not working",
    icon: "🖨️",
  },
  {
    value: "server_database",
    label: "Server/Database Issue",
    desc: "Backend, server, database access issues",
    icon: "🗄️",
  },
  {
    value: "training_onboarding",
    label: "Training/Onboarding",
    desc: "Help with new tools or processes",
    icon: "🎓",
  },
  {
    value: "other",
    label: "Other",
    desc: "Anything not covered above",
    icon: "❓",
  },
];

const IssueCategoryCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TICKET_CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => navigate(`/addticket/${cat.value}`)}
          className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100"
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-2xl transition group-hover:bg-cyan-100">
            {cat.icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{cat.label}</h3>
          <p className="mt-1 text-xs text-gray-500">{cat.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default IssueCategoryCards;
