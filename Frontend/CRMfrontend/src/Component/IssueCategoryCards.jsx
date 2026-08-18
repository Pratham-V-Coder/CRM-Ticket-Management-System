import React from "react";
import { useNavigate } from "react-router-dom";

export const TICKET_CATEGORIES = [
  {
    value: "hardware",
    label: "Hardware Issue",
    desc: "Laptop, desktop, monitor, peripherals",
    icon: "🖥️",
    relatedIssues: [
      "Laptop/Desktop not turning on",
      "Screen flickering or display issue",
      "Keyboard or mouse not working",
      "Battery draining too fast",
      "Overheating device",
      "Hardware making unusual noise",
    ],
  },
  {
    value: "software",
    label: "Software Issue",
    desc: "OS, app crashes, installation, licensing",
    icon: "💾",
    relatedIssues: [
      "Application keeps crashing",
      "Software installation failed",
      "Operating system not updating",
      "License/activation issue",
      "Software running very slow",
    ],
  },
  {
    value: "network",
    label: "Network Issue",
    desc: "Wifi, LAN, VPN, internet connectivity",
    icon: "📡",
    relatedIssues: [
      "Wifi not connecting",
      "Internet very slow",
      "VPN not working",
      "LAN cable/port issue",
      "Frequent network disconnects",
    ],
  },
  {
    value: "application",
    label: "Application/ Access Issue",
    desc: "Login problems, access requests, CRM/ERP",
    icon: "🔐",
    relatedIssues: [
      "Unable to login to CRM/ERP",
      "Access request for new tool",
      "Permission/role issue",
      "Two-factor authentication problem",
      "Account locked out",
    ],
  },
  {
    value: "account_hr",
    label: "Account/HR Issue",
    desc: "Payroll, leave portal, ID card, attendance",
    icon: "🧾",
    relatedIssues: [
      "Payroll/salary discrepancy",
      "Leave portal not working",
      "ID card request",
      "Attendance not marked correctly",
      "HR document request",
    ],
  },
  {
    value: "email",
    label: "Email Issue",
    desc: "Email not working, spam, configuration",
    icon: "📧",
    relatedIssues: [
      "Unable to send/receive email",
      "Email account configuration issue",
      "Excessive spam emails",
      "Mailbox storage full",
      "Email sync issue on mobile",
    ],
  },
  {
    value: "asset_request",
    label: "Asset Request",
    desc: "New laptop, monitor, accessories",
    icon: "📦",
    relatedIssues: [
      "New laptop request",
      "Monitor/accessory request",
      "Replacement for damaged asset",
      "Additional peripheral request",
    ],
  },
  {
    value: "security",
    label: "Security Issue",
    desc: "Virus, suspicious activity, password reset",
    icon: "🛡️",
    relatedIssues: [
      "Suspected virus/malware",
      "Suspicious login activity",
      "Password reset request",
      "Phishing email reported",
      "Data security concern",
    ],
  },
  {
    value: "printer_scanner",
    label: "Printer/Scanner Issue",
    desc: "Printer or scanner not working",
    icon: "🖨️",
    relatedIssues: [
      "Printer not printing",
      "Scanner not detected",
      "Paper jam issue",
      "Print quality poor",
      "Printer offline/not connecting",
    ],
  },
  {
    value: "server_database",
    label: "Server/Database Issue",
    desc: "Backend, server, database access issues",
    icon: "🗄️",
    relatedIssues: [
      "Server downtime",
      "Database connection failed",
      "Slow query/performance issue",
      "Backup/restore request",
      "Access request to server/DB",
    ],
  },
  {
    value: "training_onboarding",
    label: "Training Onboading",
    desc: "Help with new tools or processes",
    icon: "🎓",
    relatedIssues: [
      "Need training on a new tool",
      "Onboarding process query",
      "Documentation/guide request",
      "Process clarification needed",
    ],
  },
  {
    value: "other",
    label: "Other",
    desc: "Anything not covered above",
    icon: "❓",
    relatedIssues: [],
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
          className="group flex w-full min-w-0 flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100"
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-2xl transition group-hover:bg-cyan-100">
            {cat.icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 break-words">
            {cat.label}
          </h3>
          <p className="mt-1 text-xs text-gray-500 break-words">{cat.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default IssueCategoryCards;
