import { useAdmin } from "../hooks/useAdmin";
import { useAppContext } from "../../../context/AppScope";
import { Navbar } from "../../../components/Navbar";
import { useHome } from "../../Home/hooks/useHome";

export interface Booking {
  _id: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  resortName: string;
  numberOfRooms: number;
  numberOfGuests: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  bookingReference: string;
}

export const BookingList = () => {
  const { AppState } = useAppContext();
  const { setIsOpenModal, navigate, onLogout } = useHome();
  const userDetails = AppState;
  const { allBookingData, handleNext, page } = useAdmin();

  const bookingInfo = allBookingData.data?.data
    ? allBookingData.data?.data
    : [];
  const pagination = allBookingData.data?.pagination;

  const isDisabled = allBookingData.isPending;

  return (
    <div className="w-full bg-white/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-5  ">
        <Navbar
          setIsOpenModal={setIsOpenModal}
          userDetails={userDetails}
          logout={onLogout}
        />
        <h1 className="pt-4 md:pt-28 text-4xl">Bookings</h1>
        <table className="table-auto w-full md:mt-15">
          <thead className="text-gray-900 text-sm text-left  border-b-1 border-b-gray-400">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Sl:No.</th>
              <th className="px-4 py-3 font-semibold truncate">Name</th>
              <th className="px-4 py-3 font-semibold truncate">email</th>
              <th className="px-4 py-3 font-semibold truncate">phone</th>
              <th className="px-4 py-3 font-semibold truncate">Resort Name</th>
              <th className="px-4 py-3 font-semibold truncate">No.of Rooms</th>
              <th className="px-4 py-3 font-semibold truncate">No.of Guest</th>
              <th className="px-4 py-3 font-semibold truncate">Check In</th>
              <th className="px-4 py-3 font-semibold truncate">Check out</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-500 ">
            {bookingInfo.length > 0 && (
              <>
                {bookingInfo.map((item: Booking, i: number) => (
                  <tr key={item._id} className="border-b-1 border-b-gray-400">
                    <td className="px-4 py-3">{i + 1}</td>
                    <td className="px-4 py-3">{item.customerName}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{item.resortName}</td>
                    <td className="px-4 py-3">{item.numberOfRooms}</td>
                    <td className="px-4 py-3">{item.numberOfGuests}</td>
                    <td className="px-4 py-3">
                      {item.checkInDate.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3">
                      {item.checkOutDate.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        {bookingInfo.length > 0 && (
          <div className="flex items-center gap-2 w-full justify-center my-7">
            <button
              type="button"
              aria-label="Previous"
              className="mr-4 cursor-pointer"
              disabled={!pagination?.hasPrevPage || isDisabled}
              onClick={() => handleNext(page.pageIndex - 1)}
            >
              <svg
                width="9"
                height="16"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1L2 9.24242L11 17"
                  stroke="#111820"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="flex gap-2 text-gray-500 text-sm md:text-base">
              {Array.from(
                { length: pagination?.totalPages || 0 },
                (_, index) => (
                  <button
                    type="button"
                    disabled={isDisabled}
                    className={`flex items-center cursor-pointer justify-center active:scale-95 w-9 md:w-12 h-9 md:h-12 aspect-square bg-white border border-gray-200 rounded-md hover:bg-gray-100/70 transition-all ${
                      pagination.currentPage == index + 1
                        ? "!bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleNext(index + 1)}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              aria-label="Next"
              className="ml-4 cursor-pointer "
              disabled={!pagination?.hasNextPage || isDisabled}
              onClick={() => handleNext(page.pageIndex + 1)}
            >
              <svg
                width="9"
                height="16"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L10 9.24242L1 17"
                  stroke="#111820"
                  strokeOpacity="0.7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
        {bookingInfo.length == 0 && !allBookingData.isPending && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm w-full">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 9a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              No items found.
            </p>
            <p className="text-gray-500">Add a new booking to get started.</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => navigate("/")}
            >
              Go back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
