import { useHome } from "../hooks/useHome";
import { useAppContext } from "../../../context/AppScope";
import { useBookings } from "../hooks/useBookings";
import { Navbar } from "../../../components/Navbar";

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

export const MyBooking = () => {
  const { AppState } = useAppContext();
  const { setIsOpenModal, navigate, onLogout } = useHome();
  const userDetails = AppState;
  const { data } = useBookings({ email: userDetails.email });
  const { bookingInfo = [] } = !!data && !!data.data && data.data;

  return (
    <div className="w-full bg-white/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-5  ">
        <Navbar
          setIsOpenModal={setIsOpenModal}
          userDetails={userDetails}
          logout={onLogout}
        />
        <h1 className="pt-25 text-4xl">My Bookings</h1>
        <p className="max-w-130 py-4 opacity-60">
          Easily manage your past, current, and upcoming hotel reservations in
          one place. Plan your trips seamlessly with just a few clicks
        </p>
        <table className="table-auto w-full">
          <thead className="text-gray-900 text-sm text-left  border-b-1 border-b-gray-400">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Sl:No.</th>
              <th className="px-4 py-3 font-semibold truncate">Name</th>
              <th className="px-4 py-3 font-semibold truncate">Resort Name</th>
              <th className="px-4 py-3 font-semibold truncate">No.of Rooms</th>
              <th className="px-4 py-3 font-semibold truncate">No.of Guest</th>
              <th className="px-4 py-3 font-semibold truncate">Check In</th>
              <th className="px-4 py-3 font-semibold truncate">Check out</th>
            </tr>
          </thead>
          {bookingInfo.length > 0 ? (
            <tbody className="text-sm text-gray-500">
              {bookingInfo.map((item: Booking, i: number) => (
                <tr
                  key={item.customerId}
                  className="border-b-1 border-b-gray-400"
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3">{item.customerName}</td>
                  <td className="px-4 py-3">{item.resortName}</td>
                  <td className="px-4 py-3">{item.numberOfRooms}</td>
                  <td className="px-4 py-3">{item.numberOfGuests}</td>
                  <td className="px-4 py-3">{item.checkInDate.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    {item.checkOutDate.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <></>
          )}
        </table>
        {!bookingInfo.length && (
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
