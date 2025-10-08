import React from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-responsive-modal";

type bookValues = {
  firstName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: string;
  numberOfRooms: string;
  resortName: string;
};

type props = {
  isOpenModal: boolean;
  setOpenBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleBooking: UseMutationResult<any, Error, bookValues, unknown>;
};

export const BookModal = ({
  isOpenModal,
  setOpenBookModal,
  handleBooking,
}: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<bookValues>();
  const onSubmit: SubmitHandler<bookValues> = async (data) => {
    const {
      checkInDate,
      checkOutDate,
      email,
      firstName,
      numberOfGuests,
      numberOfRooms,
      phone,
      resortName,
    } = data;
    try {
      await handleBooking.mutateAsync({
        checkInDate,
        checkOutDate,
        email,
        firstName,
        numberOfGuests,
        numberOfRooms,
        phone,
        resortName,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClose = () => {
    setOpenBookModal(false);
  };
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        center
        showCloseIcon={true}
        classNames={{
          modal: "customModal",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full text-center  px-8 "
        >
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">Booking</h1>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div
                className={` flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.firstName?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <input
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    minLength: {
                      value: 3,
                      message: "Minlength should be greater than 3",
                    },
                  })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                  placeholder="User Name"
                  className={`border-none outline-none ring-0 `}
                />
              </div>
              {errors.firstName && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.email?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <div>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    placeholder="Email"
                    className={`border-none outline-none ring-0 `}
                  />
                </div>
              </div>{" "}
              {errors.email && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div
                className={` flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.phone?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <input
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone is required",
                    },
                  })}
                  aria-invalid={errors.phone ? "true" : "false"}
                  placeholder="Phone"
                  className={`border-none outline-none ring-0 `}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.resortName?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <div>
                  <input
                    {...register("resortName", {
                      required: {
                        value: true,
                        message: "Resort Name is required",
                      },
                    })}
                    aria-invalid={errors.resortName ? "true" : "false"}
                    placeholder="Resort"
                    className={`border-none outline-none ring-0 `}
                  />
                </div>
              </div>{" "}
              {errors.resortName && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.resortName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div
                className={` flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.numberOfRooms?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <input
                  type="number"
                  {...register("numberOfRooms", {
                    required: {
                      value: true,
                      message: "Number of rooms is required",
                    },
                  })}
                  aria-invalid={errors.numberOfRooms ? "true" : "false"}
                  placeholder="No of rooms"
                  className={`border-none outline-none ring-0 `}
                />
              </div>
              {errors.numberOfRooms && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.numberOfRooms.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.numberOfGuests?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <div className="w-full mr-5">
                  <input
                    type="number"
                    {...register("numberOfGuests", {
                      required: {
                        value: true,
                        message: "Guest is required",
                      },
                      min: {
                        value: 1,
                        message: "Minimum 1 guest required",
                      },
                    })}
                    aria-invalid={errors.numberOfGuests ? "true" : "false"}
                    placeholder="Guest"
                    className={`border-none outline-none ring-0 w-full`}
                  />
                </div>
              </div>{" "}
              {errors.numberOfGuests && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.numberOfGuests.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div
                className={` flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.checkInDate?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <input
                  type="date"
                  {...register("checkInDate", {
                    required: {
                      value: true,
                      message: "Check in date is required",
                    },
                  })}
                  aria-invalid={errors.checkInDate ? "true" : "false"}
                  placeholder="Check in Date"
                  className={`border-none outline-none ring-0 w-full pr-6`}
                />
              </div>
              {errors.checkInDate && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.checkInDate.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
                  errors && errors?.checkOutDate?.message
                    ? "border border-red-400"
                    : ""
                }`}
              >
                <input
                  type="date"
                  {...register("checkOutDate", {
                    required: {
                      value: true,
                      message: "Check out date is required",
                    },
                  })}
                  aria-invalid={errors.checkOutDate ? "true" : "false"}
                  placeholder="Guest"
                  className={`border-none outline-none ring-0 w-full pr-6`}
                />
              </div>{" "}
              {errors.checkOutDate && (
                <p className="mt-2 text-start text-red-400 pl-3">
                  {errors.checkOutDate.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row my-4 gap-4">
            <button
              type="submit"
              className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              Book Now
            </button>
            <button
              type="button"
              className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
