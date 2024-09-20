import React from "react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = ({ title, links }) => {
  return (
    <>
      <Navbar title={title} links={links} />
      <div className="background-container">
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};
