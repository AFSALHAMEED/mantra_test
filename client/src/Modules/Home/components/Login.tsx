import React from "react";
import { Modal } from "react-responsive-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type FormValues = {
  firstName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type props = {
  isOpenModal: boolean;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  userLogin: UseMutationResult<
    any,
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
};

export const Login = ({ isOpenModal, state, userLogin }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    try {
      await userLogin.mutateAsync({
        email: email,
        password,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <Modal open={isOpenModal} onClose={() => {}} center showCloseIcon={true}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:w-[350px] w-full text-center  px-8 "
        >
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">
            {state === "login" ? "Login" : "Sign up"}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Please sign in to continue
          </p>

          <div
            className={`flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
              errors && errors?.email?.message ? "border border-red-400" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail-icon lucide-mail"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              className="border-none outline-none ring-0"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Id is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-start text-red-400 pl-3">
              {errors.email.message}
            </p>
          )}
          <div
            className={`flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${
              errors && errors?.password?.message ? "border border-red-400" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock-icon lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="border-none outline-none ring-0"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-start text-red-400 pl-3">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {state === "login" ? "Login" : "Sign up"}
          </button>
          <p
            onClick={() => {
              navigate("/signUp");
            }}
            className="text-gray-500 text-sm mt-3 mb-11"
          >
            "Don't have an account?"
            <a href="#" className="text-indigo-500 hover:underline">
              click here
            </a>
          </p>
        </form>
      </Modal>
    </div>
  );
};
