import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import Layout from "./components/Layout";
import TechnicianLayout from "./components/TechnicianLayout";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import Items from "./pages/Items";
import Customers from "./pages/Customers";
import Installations from "./pages/Installations";
import Services from "./pages/Services";
import CompletedServices from "./pages/CompletedServices";

import StatusUpdate from "./pages/StatusUpdate";
import StatusView from "./pages/StatusView";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route path="/dashboard" element={<Layout />}>
        {/* DEFAULT PAGE */}
        <Route index element={<Navigate to="home" />} />

        {/* ADMIN PAGES */}
        <Route path="home" element={<Home />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="items" element={<Items />} />

        <Route path="customers" element={<Customers />} />

        <Route path="installations" element={<Installations />} />

        <Route path="services" element={<Services />} />

        <Route path="completed-services" element={<CompletedServices />} />

        <Route path="status-update" element={<StatusUpdate />} />

        <Route path="status-view" element={<StatusView />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="home" />} />
      </Route>

      {/* ================= TECHNICIAN DASHBOARD ================= */}
      <Route path="/technician" element={<TechnicianLayout />}>
        {/* DEFAULT PAGE */}
        <Route index element={<Navigate to="customers" />} />

        {/* TECHNICIAN PAGES */}
        <Route path="customers" element={<Customers />} />

        <Route path="installations" element={<Installations />} />

        <Route path="services" element={<Services />} />

        <Route path="status" element={<StatusUpdate />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="customers" />} />
      </Route>
    </Routes>
  );
}

export default App;
