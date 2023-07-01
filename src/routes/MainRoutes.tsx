import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Homepage } from "../pages/Homepage";
import { QueueAuthAdmin } from "../pages/QueueAuthAdmin";
import ClientPage from "../pages/ClientPage";
import Statistics from "../pages/Statistics";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/queue" element={<QueueAdminPage />}></Route>
        <Route path="/operator_stat" element={<Statistics />} />
      </Route>
      <Route path="/auth" element={<QueueAuthAdmin />}></Route>
    </Routes>
  );
};
