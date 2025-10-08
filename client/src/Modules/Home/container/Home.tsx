import { Services } from "../../../components/Services";
import { Gallery } from "../../../components/Gallery";
import { About } from "../../../components/About";
import { Footer } from "../../../components/Footer";
import { useHome } from "../hooks/useHome";
import { Login } from "../components/Login";
import { BookModal } from "../components/BookModal";
import { HeroSection } from "../../../components/HeroSection";

export const Home = () => {
  const {
    userLogin,
    state,
    setState,
    isOpenModal,
    setIsOpenModal,
    context,
    openBookModal,
    setOpenBookModal,
    handleBooking,
    onLogout,
  } = useHome();
  return (
    <div>
      <HeroSection
        setIsOpenModal={setIsOpenModal}
        userDetails={context?.AppState!}
        setOpenBookModal={setOpenBookModal}
        onLogout={onLogout}
      />
      <Services />
      <Gallery />
      <About />
      <Footer />
      {isOpenModal && (
        <Login
          isOpenModal={isOpenModal}
          state={state}
          setState={setState}
          userLogin={userLogin}
        />
      )}
      {openBookModal && (
        <BookModal
          isOpenModal={openBookModal}
          setOpenBookModal={setOpenBookModal}
          handleBooking={handleBooking}
        />
      )}
    </div>
  );
};
