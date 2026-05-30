import React from "react";
import { Link } from "react-router-dom";

function DataTable({ Tickets }) {
  return (
    <div className="overflow-x-auto w-6xl ml-10 mt-8">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-100 text-left">S.No</th>
            <th className="border px-4 py-2 bg-gray-100 text-left">Subject</th>
            <th className="border px-4 py-2 bg-gray-100 text-left">Status</th>
            <th className="border px-4 py-2 bg-gray-100 text-left">
              Opened Date
            </th>
          </tr>
        </thead>
        <tbody>
          {Tickets && Tickets.length > 0 ? (
            Tickets.map((item, index) => (
              <tr key={item.id || index}>
                {" "}
                {/* ✅ key prop add kiya */}
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <Link to="/TicketPage">{item.subject}</Link>
                </td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2">{item.openedDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No Tickets Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
