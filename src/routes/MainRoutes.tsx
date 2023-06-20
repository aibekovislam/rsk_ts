import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Homepage } from "../pages/Homepage";
import { QueueAuthAdmin } from "../pages/QueueAuthAdmin";
import ClientPage from "../pages/ClientPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/client" element={<ClientPage />} />
      </Route>
      <Route path="/auth" element={<QueueAuthAdmin />}></Route>
    </Routes>
  );
};
