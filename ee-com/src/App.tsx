import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Customers from "./pages/Customers";
import Installations from "./pages/Installations";
import Services from "./pages/Services";
import CompletedServices from "./pages/CompletedServices";
import StatusUpdate from "./pages/StatusUpdate";
import StatusView from "./pages/StatusView";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Layout />}>
        {/* DEFAULT REDIRECT */}
        <Route index element={<Navigate to="home" />} />
        {/* ✅ FIXED ROUTES */}
        <Route path="home" element={<Home />} /> {/* ✅ ONLY ONE HOME */}
        <Route path="dashboard" element={<Dashboard />} /> {/* optional */}
        <Route path="items" element={<Items />} />
        <Route path="customers" element={<Customers />} />
        <Route path="installations" element={<Installations />} />
        <Route path="services" element={<Services />} />
        <Route path="completed-services" element={<CompletedServices />} />
        <Route path="status-update" element={<StatusUpdate />} />
        <Route path="status-view" element={<StatusView />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="home" />} />
      </Route>
    </Routes>
  );
}

export default App;
