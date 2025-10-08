import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AppScope } from "./context/AppScope";
import { Home } from "./Modules/Home/container/Home";
import { Register } from "./Modules/Home/container/Register";
import { MyBooking } from "./Modules/Home/container/MyBooking";
import { BookingList } from "./Modules/Admin/container/BookingList";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppScope>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<Register />} />
            <Route path="/my-bookings" element={<MyBooking />} />
            <Route path="/all-bookings" element={<BookingList />} />
          </Routes>
          <ToastContainer />
        </AppScope>
      </QueryClientProvider>
    </>
  );
};

export default App;
