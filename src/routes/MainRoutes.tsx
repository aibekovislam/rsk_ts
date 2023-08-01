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
import Chat from "../pages/Chat";
import ChatDetail from "../pages/ChatDetail";

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
        <Route path="/offline" element={<OfflinePage/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
      </Route>
        <Route path="/chat/detail/:user1/:user2/:username" element={<ChatDetail />} />
      <Route path="/auth" element={<QueueAuthAdmin />}></Route>
    </Routes>
  );
};
