import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Homepage } from "../pages/Homepage";
import QueueAdminPage from "../pages/QueueAdminPage";
import { QueueAuthAdmin } from "../pages/QueueAuthAdmin";
import ClientPage from "../pages/ClientPage";
import OperatorChart from "../pages/OperatorChart";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/queue" element={<QueueAdminPage />}></Route>
        <Route path="/operators_chart" element={<OperatorChart />} />
      </Route>
      <Route path="/auth" element={<QueueAuthAdmin />}></Route>
    </Routes>
  );
};
