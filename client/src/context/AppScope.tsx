import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../Modules/Home/hooks/home.api";
import { useNavigate } from "react-router-dom";

interface AppStateType {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AppContextType {
  AppState: AppStateType;
  setAppState: React.Dispatch<React.SetStateAction<AppStateType>>;
  onLogout: () => void;
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
  const navigate = useNavigate();

  const { refetch: logout, isSuccess } = useQuery({
    queryKey: ["logout", AppState],
    queryFn: logoutUser,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setAppState({
        name: "",
        email: "",
        isAdmin: false,
      });

      localStorage.clear();
      navigate("/");
    }
  }, [isSuccess]);

  const onLogout = async () => {
    await setAppState({
      name: "",
      email: "",
      isAdmin: false,
    });
    logout();
  };

  return (
    <AppContext.Provider value={{ AppState, setAppState, onLogout }}>
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
