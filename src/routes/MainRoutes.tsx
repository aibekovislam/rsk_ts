import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Homepage } from "../pages/Homepage";
import QueueAdminPage from "../pages/QueueAdminPage";
import { QueueAuthAdmin } from "../pages/QueueAuthAdmin";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/queue/admin" element={<QueueAdminPage/>} ></Route>
      </Route>
      <Route path="/auth" element={<QueueAuthAdmin />}></Route>
    </Routes>
  );
};
