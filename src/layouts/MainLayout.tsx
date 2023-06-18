import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
