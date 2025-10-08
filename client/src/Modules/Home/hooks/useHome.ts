import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { bookResort, login, register } from "./home.api";
import { AppContext } from "../../../context/AppScope";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useHome = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState<string>("login");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [openBookModal, setOpenBookModal] = useState<boolean>(false);
  const context = useContext(AppContext);

  const handleUserData = (data: {
    name: string;
    email: string;
    isAdmin: false;
  }) => {
    const userString = JSON.stringify(data);
    localStorage.setItem("userData", userString);
    if (context?.setAppState) {
      context.setAppState(data);
    }
    setIsOpenModal(false);
  };

  const userLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Logged In Successfully");
      handleUserData(data.user);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const userRegister = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success("Registered Successfully");
      handleUserData(data.user);
      navigate("/");
    },
    onError: (error) => {
      console.log({ error });
    },
  });
  const handleBooking = useMutation({
    mutationFn: bookResort,
    onSuccess: () => {
      toast.success("Booked Successfully");
      setOpenBookModal(false);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return {
    userLogin,
    userRegister,
    state,
    setState,
    isOpenModal,
    setIsOpenModal,
    context,
    openBookModal,
    setOpenBookModal,
    handleBooking,
    navigate,
    onLogout: context?.onLogout!,
  };
};
