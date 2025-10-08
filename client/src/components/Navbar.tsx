import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = ({
  setIsOpenModal,
  userDetails,
  logout,
}: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userDetails: { name: string; email: string; isAdmin: boolean };
  logout: () => void;
}) => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#services" },
    { name: "Gallery", path: "#gallery" },
    { name: "About", path: "#about" },
  ];
  const { pathname } = useLocation();
  console.log("pathname: ", pathname);
  const [isScrolled, setIsScrolled] = useState<Boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : `py-4 md:py-6 ${
              pathname.includes("all-bookings") ? "shadow-md" : ""
            }`
      }`}
    >
      <Link to="/" className="flex items-center text-2xl text-amber-400">
        Rustic Leisures
      </Link>
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-black"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-black"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}
        {userDetails.name && (
          <Link
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-black"
            }`}
            to={userDetails.isAdmin ? "/all-bookings" : "/my-bookings"}
          >
            {userDetails.isAdmin ? "Bookings" : "My Bookings"}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-black"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        )}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {userDetails.name ? (
          <div className="flex flex-wrap justify-center gap-12">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => logout()}
            >
              <h1>Logout </h1>
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="userImage1"
              />
            </div>
          </div>
        ) : (
          <button
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer ${
              isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
            onClick={() => setIsOpenModal(true)}
          >
            Login
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
          {userDetails.name ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};
