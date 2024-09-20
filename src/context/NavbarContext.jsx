// src/contexts/NavbarContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import navbarConfig from "../config/navbarConfig";

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const location = useLocation();
  const [config, setConfig] = useState(navbarConfig["/"]);

  useEffect(() => {
    const currentConfig = navbarConfig[location.pathname] || navbarConfig["/"];
    setConfig(currentConfig);
  }, [location.pathname]);

  return (
    <NavbarContext.Provider value={config}>
      {children}
    </NavbarContext.Provider>
  );
};
