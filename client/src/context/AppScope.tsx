import axios, { AxiosStatic } from "axios";
import React, { createContext, useContext, useState } from "react";

interface AppStateType {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AppContextType {
  AppState: AppStateType;
  setAppState: React.Dispatch<React.SetStateAction<AppStateType>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppScope: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initial: AppStateType = {
    name: "",
    email: "",
    isAdmin: false,
  };

  const localData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")!)
    : initial;

  const [AppState, setAppState] = useState<AppStateType>(localData);

  return (
    <AppContext.Provider value={{ AppState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppScope");
  }
  return context;
};
