import React from "react";
import { Navbar } from "./Navbar";
import { toast } from "react-toastify";

export const HeroSection = ({
  setIsOpenModal,
  userDetails,
  setOpenBookModal,
  onLogout,
}: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: { name: string; email: string; isAdmin: boolean };
  setOpenBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}) => {
  return (
    <div>
      <section className="flex flex-col  pb-48 md:pl-16 lg:pl-32 text-sm text-white max-md:px-2 bg-[url('/src/assets/heroImage.png')] bg-cover bg-center">
        <Navbar
          setIsOpenModal={setIsOpenModal}
          userDetails={userDetails}
          logout={onLogout}
        />
        <div className=" p-1.5 mt-24 md:mt-44  text-xs">
          <span className="bg-[#49B9FF80] p-3 rounded-full">
            The Ultimate Hotel Experience
          </span>

          <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-10 max-w-4xl">
            Discover Your Perfect
          </h1>
          <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-3  max-w-4xl">
            Getaway Destination
          </h1>
        </div>
        <button
          className="bg-white text-slate-800 hover:bg-gray-300 text-nowrap px-8 md:px-10 h-12 mr-2 rounded-full font-medium transition w-max mt-6 cursor-pointer"
          onClick={() => {
            if (userDetails.email) {
              setOpenBookModal(true);
            } else {
              toast.error("Please login to book");
            }
          }}
        >
          Book Now
        </button>
      </section>
    </div>
  );
};
