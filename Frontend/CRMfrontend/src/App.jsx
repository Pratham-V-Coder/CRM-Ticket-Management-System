import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "./page/Login";
import ForgotPassword from "./page/ForgotPassword";

import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import PrivateRoute from "./page/PrivateRoute";

import Dashboad from "./page/Dashboad";
import AddTicket from "./page/AddTicket";
import TicketListing from "./page/TicketListing";
import TicketPage from "./page/TicketPage";

import AdminDashboard from "./page/AdminDashboard";

import HelpSection from "./page/HelperSection";
import CreateUser from "./page/CreateUser";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/resetpassword", element: <ForgotPassword /> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={["employee"]}>
        <Navbar />
        <div className="pt-16">
          <HelpSection />
          <Dashboad />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/create-user",
    element: (
      <PrivateRoute isAdmin={true}>
        <Navbar />
        <div className="pt-16">
          <CreateUser />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/addticket",
    element: (
      <PrivateRoute roles={["employee"]}>
        <Navbar />
        <div className="pt-16">
          <AddTicket />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/ticketlist",
    element: (
      <PrivateRoute roles={["employee"]}>
        <Navbar />
        <div className="pt-16">
          <TicketListing />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/ticketpage/:id",
    element: (
      <PrivateRoute roles={["employee"]}>
        <Navbar />
        <div className="pt-16">
          <TicketPage />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute isAdmin={true}>
        <Navbar />
        <div className="pt-16">
          <AdminDashboard />
        </div>
      </PrivateRoute>
    ),
  },

  { path: "*", element: <Navigate to="/login" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
