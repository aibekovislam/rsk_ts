import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Homepage } from "../pages/Homepage";
import { QueueAuthAdmin } from "../pages/QueueAuthAdmin";
import ClientPage from "../pages/ClientPage";
import Statistics from "../pages/Statistics";
import QueueOperatorPage from "../pages/QueueOperatorPage";
import QueueHistoryOperatorPage from "../pages/QueueHistoryOperatorPage";
import BookingOperatorPage from "../pages/BookingOperatorPage";
import OfflinePage from "../pages/OfflinePage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/operator/queue" element={<QueueOperatorPage />}></Route>
        <Route path="/operator_stat" element={<Statistics />} />
        <Route path="/operator/queue_history" element={<QueueHistoryOperatorPage/>} ></Route>
        <Route path="/operator/queue_booking" element={<BookingOperatorPage/>} ></Route>
        <Route path="/offline" element={<OfflinePage/>} ></Route>
      </Route>
      <Route path="/auth" element={<QueueAuthAdmin />}></Route>
    </Routes>
  );
};
