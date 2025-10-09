import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllBooking } from "./admin.api";

export const useAdmin = () => {
  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
  });

  const { pageIndex, pageSize, search } = page;

  const allBookingData = useQuery({
    queryKey: ["allBookingList", pageIndex, pageSize, search],
    queryFn: () => getAllBooking(page),
  });

  const handleNext = (data: number) => {
    setPage((prev) => ({ ...prev, pageIndex: data }));
  };

  return { page, setPage, allBookingData, handleNext };
};
